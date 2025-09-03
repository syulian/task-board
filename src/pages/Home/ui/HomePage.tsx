'use client';
import React, { useEffect, useState } from 'react';
import { HiCalendarDays } from 'react-icons/hi2';
import { List } from '@features/List';
import { SettingsButton, SearchInput, DefaultButton } from '@shared/ui';
import AddInput from '@shared/ui/Input/AddInput/AddInput';

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
        <main className="bg-background-dark w-[calc(100%-340px)] p-4">
            <header className="py-4 flex items-center justify-between gap-4">
                <div className="flex gap-4 w-full">
                    <SettingsButton onClick={() => {}}>{board}</SettingsButton>
                    <SearchInput
                        onChange={() => {}}
                        placeholder={`Start typing ${command} to search ...`}
                    />
                </div>
                <DefaultButton onClick={() => {}}>
                    <HiCalendarDays size={24} />
                </DefaultButton>
            </header>
            <section className="w-full flex overflow-x-scroll pb-4">
                <List />
                <div className="min-w-80 ml-8">
                    <AddInput onChange={() => {}} placeholder="Add List" onSubmit={() => {}} />
                </div>
            </section>
        </main>
    );
}
