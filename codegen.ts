import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: 'http://localhost:3000/api/graphql',
    documents: 'server/graphql/**.ts',
    generates: {
        'server/graphql/': {
            preset: 'client',
            plugins: [],
        },
        './graphql.schema.json': {
            plugins: ['introspection'],
        },
    },
};

export default config;
