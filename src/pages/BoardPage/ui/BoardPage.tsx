import { Metadata } from 'next';
import React from 'react';
import { Board } from '@widgets/Board';
import { Header } from '@widgets/Header';

type Params = {
    id: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
    const { id } = await params;

    return {
        title: id,
    };
}

export async function BoardPage() {
    return (
        <main className="flex flex-col bg-background-dark w-screen min-w-80 p-4">
            <Header />
            <Board />
        </main>
    );
}
