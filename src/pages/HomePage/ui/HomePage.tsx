import Image from 'next/image';
import React from 'react';
import logo from '@shared/assets/images/website-logo.png';

export function HomePage() {
    return (
        <main className="flex justify-center items-center w-screen h-screen">
            <h1 className="flex items-center gap-6 text-5xl font-bold text-surface-light select-none">
                <Image
                    alt="logo"
                    src={logo}
                    width={84}
                    height={84}
                    priority
                    className="border-2 border-surface-light rounded-md"
                />
                TaskBoard
            </h1>
        </main>
    );
}
