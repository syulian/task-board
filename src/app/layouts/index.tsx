import { Metadata } from 'next';
import React, { ReactNode } from 'react';
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
            { url: 'icons/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: 'icons/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: 'icons/apple-touch-icon.png',
    },
    manifest: 'icons/site.webmanifest',
};

export function RootLayout({ children }: IRootLayoutProps) {
    return (
        <html lang="en">
            <body>
                <div className="flex ">
                    <LeftSidebar />
                    {children}
                </div>
            </body>
        </html>
    );
}
