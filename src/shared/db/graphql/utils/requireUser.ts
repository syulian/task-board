import { GraphQLError } from 'graphql/error';
import { User } from 'next-auth';

const requireUser = (user?: User) => {
    const userId = user?.id;
    if (!userId) {
        throw new GraphQLError('Unauthorized', { extensions: { code: 'UNAUTHORIZED' } });
    }

    return userId;
};

export default requireUser;
