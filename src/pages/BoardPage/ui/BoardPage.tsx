import React from 'react';
import { Board } from '@widgets/Board';
import { Header } from '@widgets/Header';
import { RightSidebar } from '@features/RightSidebar';

export async function BoardPage() {
    return (
        <>
            <main className="flex flex-col bg-bg-primary w-screen min-w-80 p-4">
                <Header />
                <Board />
            </main>
            <RightSidebar />
        </>
    );
}
