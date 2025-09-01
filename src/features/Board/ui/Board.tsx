import React from 'react';

interface IBoardProps {
    title: string;
}

export default function Board({ title }: IBoardProps) {
    return (
        <nav>
            <ul>
                {Array.from({ length: 10 }).map((_, i) => (
                    <li key={i}>{i}</li>
                ))}
            </ul>
        </nav>
    );
}
