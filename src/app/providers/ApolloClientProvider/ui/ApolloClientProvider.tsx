'use client';
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import React, { FC, ReactNode } from 'react';

interface ApolloClientProvider {
    children?: ReactNode;
}

const GRAPHQL_URI = process.env.GRAPHQL_URI || 'http://localhost:3000/api/graphql';

const ApolloClientProvider: FC<ApolloClientProvider> = ({ children }) => {
    const client = new ApolloClient({
        link: new HttpLink({ uri: GRAPHQL_URI }),
        cache: new InMemoryCache(),
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
