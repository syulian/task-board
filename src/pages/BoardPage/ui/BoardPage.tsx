import { Metadata } from 'next';
import React from 'react';
import getBoardById from '@pages/BoardPage/api/getBoardById';
import { Board } from '@widgets/Board';
import { Header } from '@widgets/Header';

type Params = {
    params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
    try {
        const { id } = await params;

        const data = await getBoardById(id);
        return { title: data?.name || 'Board' };
    } catch (error) {
        console.error(error);
    }

    return { title: 'Board' };
}

export async function BoardPage() {
    return (
        <main className="flex flex-col bg-bg-primary w-screen min-w-80 p-4">
            <Header />
            <Board />
        </main>
    );
}
