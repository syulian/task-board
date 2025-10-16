import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function NotFoundPage() {
    const t = await getTranslations('Main');

    return (
        <main className="flex flex-col justify-center items-center gap-4 w-screen h-screen">
            <h1 className="text-8xl font-bold">404</h1>
            <p className="text-bg-neutral-lighter">{t('notFound.name')}</p>
            <Link href={'/'} className="flex items-center gap-2 text-sm hover:underline">
                {t('notFound.title')}
            </Link>
        </main>
    );
}
