import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: './src/shared/db/graphql/typeDefs',
    documents: ['./src/**/*.graphql', './src/**/*.gql'],
    generates: {
        './src/shared/types/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-operations',
                'typescript-react-apollo',
                'typescript-resolvers',
            ],
        },
    },
};

export default config;
