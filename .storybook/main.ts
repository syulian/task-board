import type { StorybookConfig } from '@storybook/nextjs-vite';

const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
    addons: ['@chromatic-com/storybook', '@storybook/addon-docs', '@storybook/addon-a11y'],
    framework: {
        name: '@storybook/nextjs-vite',
        options: {
            nextConfigPath: './next.config.js',
        },
    },
    staticDirs: ['../public'],
    features: {
        experimentalRSC: true,
    },
};
export default config;
