import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import React, { ReactNode } from 'react';
import { ApolloClientProvider } from '@app/providers/ApolloClientProvider';
import { NextAuthProvider } from '@app/providers/NextAuthProvider';
import { StoreProvider } from '@app/providers/StoreProvider';
import { ThemeProvider } from '@app/providers/ThemeProvider';
import { LeftSidebar } from '@widgets/LeftSidebar';
import '../styles';

interface IRootLayoutProps {
    children: ReactNode;
}

export const metadata: Metadata = {
    title: {
        default: 'TaskBoard',
        template: '%s | TaskBoard',
    },
    description: 'My TaskBoard Project',
    icons: {
        icon: [
            { url: '/icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: '/icons/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
};

export async function RootLayout({ children }: IRootLayoutProps) {
    const store = await cookies();
    const locale = store.get('locale')?.value || 'en';

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <ApolloClientProvider>
                    <StoreProvider>
                        <ThemeProvider>
                            <NextAuthProvider>
                                <NextIntlClientProvider messages={messages}>
                                    <div className="flex">
                                        <LeftSidebar />
                                        {children}
                                    </div>
                                </NextIntlClientProvider>
                            </NextAuthProvider>
                        </ThemeProvider>
                    </StoreProvider>
                </ApolloClientProvider>
            </body>
        </html>
    );
}
