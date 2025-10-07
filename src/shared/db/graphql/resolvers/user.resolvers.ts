import bcrypt from 'bcrypt';
import dbConnect from '@shared/db/db';
import { User } from '@shared/db/model';

export const userResolvers = {
    Mutation: {
        createUser: async (
            _: any,
            { name, email, password }: { name: string; email: string; password: string },
        ) => {
            if (!name || !email || !password) {
                throw new Error('Required fields are missing');
            }

            await dbConnect();
            const exists = await User.findOne({ email });

            if (exists) throw new Error('User already exists');

            const hashed = await bcrypt.hash(password, 10);
            return User.create({ name, email, password: hashed });
        },
    },
};
