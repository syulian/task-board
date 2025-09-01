'use client';
import React, { useEffect, useState } from 'react';
import { HiCalendarDays } from 'react-icons/hi2';
import { Board } from '@features/Board';
import { SettingsButton, SearchInput, DefaultButton } from '@shared/ui';

const os = ['win', 'mac', 'linux'];

export default function HomePage() {
    const [board, setBoard] = useState('☠️ Website');
    const [command, setCommand] = useState('');

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();

        os.forEach(n => {
            if (userAgent.includes(n)) {
                if (userAgent.includes('mac')) {
                    setCommand('use ⌘ F');
                } else {
                    setCommand('use ⊞ F');
                }
            }
        });
    }, []);

    return (
        <main className="bg-background-dark w-full p-4">
            <header className="py-4 flex gap-4">
                <SettingsButton onClick={() => {}}>{board}</SettingsButton>
                <SearchInput
                    onChange={() => {}}
                    placeholder={`Start typing ${command} to search ...`}
                />
                <DefaultButton onClick={() => {}}>
                    <HiCalendarDays size={24}/>
                </DefaultButton>
            </header>
            <section className="w-full flex ">{board && <Board title={board} />}</section>
        </main>
    );
}
