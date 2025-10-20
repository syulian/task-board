// eslint-disable-next-line @typescript-eslint/no-require-imports
const nextJest = require('next/jest');
const createJestConfig = nextJest({ dir: './' });

/** @type {import('jest').Config} **/
module.exports = async () => ({
    rootDir: '../../',
    transform: {
        '^.+\\.(ts|tsx)$': [
            'ts-jest',
            {
                tsconfig: {
                    jsx: 'react',
                },
            },
        ],
    },
    ...(await createJestConfig({
        testEnvironment: 'jsdom',
        rootDir: '../../',
    })()),
    transformIgnorePatterns: ['node_modules/(?!next-intl)/'],
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['./config/jest/setupTests.ts'],
    moduleNameMapper: {
        '^@app/(.*)$': '<rootDir>/src/app/$1',
        '^@pages/(.*)$': '<rootDir>/src/pages/$1',
        '^@widgets/(.*)$': '<rootDir>/src/widgets/$1',
        '^@features/(.*)$': '<rootDir>/src/features/$1',
        '^@entities/(.*)$': '<rootDir>/src/entities/$1',
        '^@shared/(.*)$': '<rootDir>/src/shared/$1',
        '\\.(css|scss|sass)$': 'identity-obj-proxy',
        '\\.(png|jpg|jpeg|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },
});
