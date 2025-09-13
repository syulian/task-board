'use client';
import { clsx } from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import OS from '@features/SearchInput/consts/os';
import './search-input.animation.css';

interface ISearchInputProps {
    onChange: () => void;
}

type FilterSchema = {
    name: string;
    color: string;
};

export default function SearchInput({ onChange }: ISearchInputProps) {
    const [command, setCommand] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const [filter, setFilter] = useState<FilterSchema[]>([]);

    const ulRef = useRef<HTMLUListElement>(null);

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

    const labels = [
        {
            name: 'Important',
            color: '#bd2424',
        },
        {
            name: 'Nice',
            color: '#3ea9bc',
        },
    ];

    const filters = [
        {
            name: 'No Label',
            color: '#1d2126',
        },
        {
            name: 'Due Date',
            color: '#1d2126',
        },
        {
            name: 'Complete',
            color: '#1d2126',
        },
        ...labels,
    ];

    const handleFilter = (newFilter: FilterSchema) => {
        setFilter(prev => {
            const exists = prev.some(el => el.name === newFilter.name);
            return exists ? prev.filter(el => el.name !== newFilter.name) : [...prev, newFilter];
        });
    };

    return (
        <div
            className="flex items-center border-surface-light border w-full max-w-sm p-2 gap-2 rounded-sm relative"
            onFocus={() => setIsFocused(true)}
            onBlur={e => {
                if (!e.currentTarget.contains(e.relatedTarget)) {
                    setIsFocused(false);
                }
            }}
            tabIndex={-1}
        >
            <HiMagnifyingGlass size={24} />
            <input
                className="w-full outline-none text-sm caret-surface-light h-6"
                type="search"
                onChange={onChange}
                aria-label="Search"
                placeholder={`Start typing ${command} to search ...`}
            />
            <CSSTransition
                in={isFocused}
                nodeRef={ulRef}
                timeout={300}
                classNames="search-input"
                unmountOnExit
            >
                <ul
                    className="absolute left-0 top-[calc(100%+4px)] z-20 flex flex-wrap gap-2 w-full bg-background-dark  rounded-b-md p-4 "
                    ref={ulRef}
                >
                    {filters.map((f, i) => (
                        <li key={i}>
                            <button
                                style={{ backgroundColor: f.color }}
                                className={clsx(
                                    'py-0.5 px-2 rounded-sm cursor-pointer border-2 border-background-dark',
                                    filter.some(el => el.name === f.name) &&
                                        'border-surface-lighter',
                                )}
                                onClick={() => handleFilter(f)}
                            >
                                {f.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </CSSTransition>
        </div>
    );
}
