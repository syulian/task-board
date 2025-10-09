import Image from 'next/image';
import React from 'react';
import { SessionInfo } from '@features/SessionInfo';
import logo from '@shared/assets/images/website-logo.png';

export async function HomePage() {
    return (
        <main className="flex justify-center items-center flex-col gap-4 w-screen h-screen opacity-50 select-none">
            <h1 className="flex items-center gap-6 text-5xl font-bold text-text-secondary">
                <Image alt="logo" src={logo} width={84} height={84} priority />
                TaskBoard
            </h1>
            <SessionInfo />
        </main>
    );
}
