import { MockedProvider } from '@apollo/client/testing/react';
import type { Preview } from '@storybook/nextjs-vite';
import Link from 'next/link';
import { NextIntlClientProvider } from 'next-intl';
import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';
import { ThemeProvider } from '@app/providers/ThemeProvider';
import { Locales } from '@shared/config';
import enMessages from '@shared/config/i18n/messages/en.json';
import ukMessages from '@shared/config/i18n/messages/uk.json';
import { Theme } from '@shared/lib';
import '@app/styles/globals.css';

const messagesMap = {
    [Locales.ENGLISH]: enMessages,
    [Locales.UKRAINIAN]: ukMessages,
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        a11y: {
            test: 'todo',
        },
        apolloClient: {
            MockedProvider,
        },
        nextjs: {
            appDirectory: true,
        },
    },
    globalTypes: {
        'Change theme of the preview': {
            name: 'Theme',
            defaultValue: Theme.SYSTEM,
            toolbar: {
                icon: 'mirror',
                items: [
                    { value: Theme.LIGHT, title: 'Light' },
                    { value: Theme.DARK, title: 'Dark' },
                    { value: Theme.SYSTEM, title: 'System' },
                ],
            },
        },
        'Change language of the preview': {
            name: 'Language',
            defaultValue: Locales.ENGLISH,
            toolbar: {
                icon: 'globe',
                items: [
                    { value: Locales.UKRAINIAN, title: 'Ukrainian' },
                    { value: Locales.ENGLISH, title: 'English' },
                ],
            },
        },
    },
    decorators: [
        (Story, context) => {
            const locale = context.globals['Change language of the preview'] as Locales;
            const messages = messagesMap[locale] ?? enMessages;

            return (
                <ThemeProvider initialTheme={context.globals['Change theme of the preview']}>
                    <NextIntlClientProvider messages={messages} locale={locale}>
                        <Story />
                    </NextIntlClientProvider>
                </ThemeProvider>
            );
        },
    ],
    tags: ['autodocs'],
};

Object.defineProperty(Link, 'default', {
    configurable: true,
    value: (
        props: DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>,
        // eslint-disable-next-line jsx-a11y/anchor-has-content
    ) => <a {...props} />,
});

export default preview;
