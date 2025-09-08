import React from 'react';
import { Board } from '@widgets/Board';
import { Header } from '@widgets/Header';

export default function HomePage() {
    return (
        <main className="flex flex-col bg-background-dark w-screen min-w-80 p-4">
            <Header />
            <Board />
        </main>
    );
}
