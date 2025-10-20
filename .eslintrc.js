module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'prettier', 'boundaries', 'jsx-a11y'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'plugin:react-hooks/recommended',
        'plugin:prettier/recommended',
        'prettier',
        'plugin:jsx-a11y/recommended',
        '@feature-sliced',
        '@feature-sliced/eslint-config/rules/import-order',
        '@feature-sliced/eslint-config/rules/public-api',
        '@feature-sliced/eslint-config/rules/layers-slices',
        'next/core-web-vitals',
        'next/typescript',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    settings: {
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
        boundaries: {
            default: 'disallow',
            elements: [
                { type: 'app', pattern: '@app/*' },
                { type: 'pages', pattern: '@pages/*' },
                { type: 'widgets', pattern: '@widgets/*' },
                { type: 'features', pattern: '@features/*' },
                { type: 'entities', pattern: '@entities/*' },
                { type: 'shared', pattern: '@shared/*' },
            ],
        },
    },
    rules: {
        'prettier/prettier': 'warn',
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'import/order': 'warn',
        'import/no-internal-modules': 'warn',
    },
    overrides: [
        {
            files: ['src/**/**/*.ts', 'src/**/**/*.tsx'],
            rules: {
                'import/no-internal-modules': 'off',
            },
        },
        {
            files: ['service-worker.js'],
            env: {
                serviceworker: true,
            },
            globals: {
                console: 'readonly',
            },
        }
    ],
    ignorePatterns: ['dist/', 'build/', 'node_modules/', 'src/shared/types/generated'],
};
