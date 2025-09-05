'use client';
import React, { useEffect, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import OS from '@features/SearchInput/consts/os';

interface ISearchInputProps {
    onChange: () => void;
}

export default function SearchInput({ onChange }: ISearchInputProps) {
    const [command, setCommand] = useState('');

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();

        OS.forEach(n => {
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
        <div className="flex items-center border-surface-light border w-full max-w-sm p-2 gap-2 rounded-sm">
            <HiMagnifyingGlass size={24} />
            <input
                className="w-full outline-none text-sm caret-surface-light h-6"
                type="search"
                onChange={onChange}
                aria-label="Search"
                placeholder={`Start typing ${command} to search ...`}
            />
        </div>
    );
}
