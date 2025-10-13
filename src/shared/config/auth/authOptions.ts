import bcrypt from 'bcrypt';
import { AuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import dbConnect from '@shared/db/db';
import User from '@shared/db/model/User';

export const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_SECRET!,
        }),
        Credentials({
            credentials: {
                email: { label: 'email', type: 'email', required: true },
                password: { label: 'password', type: 'password', required: true },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials.password) {
                    throw new Error('Required fields are missing');
                }

                await dbConnect();
                const user = await User.findOne({ email: credentials!.email });

                if (!user) throw new Error('User not found');
                else if (!bcrypt.compareSync(credentials.password, user.password)) {
                    throw new Error('Password is incorrect');
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                };
            },
        }),
    ],
    callbacks: {
        async signIn({ user, account }) {
            if (account?.provider === 'google') {
                await dbConnect();
                const existing = await User.findOne({ email: user.email });

                if (!existing) {
                    const newUser = await User.create({
                        name: user.name,
                        email: user.email,
                        password: '',
                    });
                    user.id = newUser._id;
                } else {
                    user.id = existing._id;
                }
            }
            return true;
        },
        async session({ session, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                },
            };
        },
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
    },
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/',
    },
};
