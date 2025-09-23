import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { resolvers } from '@shared/db/graphql/resolvers';
import { typeDefs } from '@shared/db/graphql/typeDefs';

const apolloServer = new ApolloServer({ typeDefs, resolvers });

const handler = startServerAndCreateNextHandler(apolloServer, {
    context: async (req, res) => ({ req, res }),
});

export { handler as GET, handler as POST };
