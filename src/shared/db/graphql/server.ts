import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { NextRequest } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@shared/config/auth/authOptions';
import { resolvers } from './resolvers';
import { typeDefs } from './typeDefs';

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
});

const handler = startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => {
        const session = await getServerSession(authOptions);

        return {
            req,
            res,
            user: session?.user,
        };
    },
});

export async function GET(request: NextRequest) {
    return handler(request);
}

export async function POST(request: NextRequest) {
    return handler(request);
}
