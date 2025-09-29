import Link from 'next/link';
import React from 'react';

export function NotFoundPage() {
    return (
        <main className="flex flex-col justify-center items-center gap-4 w-screen h-screen">
            <h1 className="text-8xl font-bold">404</h1>
            <p className="text-bg-neutral-lighter">
                This page does&#39;nt exist. Or maybe it moved.
            </p>
            <Link href={'/'} className="flex items-center gap-2 text-sm hover:underline">
                Back to home
            </Link>
        </main>
    );
}
