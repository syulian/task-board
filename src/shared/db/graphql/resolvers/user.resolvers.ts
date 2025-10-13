import bcrypt from 'bcrypt';
import { GraphQLError } from 'graphql/error';
import dbConnect from '@shared/db/db';
import { User } from '@shared/db/model';
import { MutationResolvers } from '@shared/types/generated/graphql';

export const userResolvers = {
    Mutation: {
        createUser: (async (_, { name, email, password }) => {
            await dbConnect();
            const exists = await User.findOne({ email });

            if (exists) {
                throw new GraphQLError('This user already exists', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const hashed = await bcrypt.hash(password, 10);
            return User.create({ name, email, password: hashed });
        }) satisfies MutationResolvers['createUser'],
    },
};
