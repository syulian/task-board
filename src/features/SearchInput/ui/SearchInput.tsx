'use client';
import { clsx } from 'clsx';
import React, { useRef } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { CSSTransition } from 'react-transition-group';
import useSearchInput from '@features/SearchInput/lib/hooks/useSearchInput';
import './search-input.animation.css';

export default function SearchInput() {
    const divRef = useRef<HTMLDivElement>(null);

    const {
        isFocused,
        setIsFocused,
        filter,
        setFilter,
        setSearch,
        command,
        tasks,
        filters,
        inputRef,
        onChange,
        handleFilter,
    } = useSearchInput();

    return (
        <div
            className="flex items-center border-bg-neutral border w-full max-w-sm p-2 gap-2 rounded-sm relative"
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
                className="w-full text-sm caret-bg-neutral h-6"
                type="search"
                onChange={onChange}
                aria-label="Search"
                placeholder={`Start typing${command} to search...`}
                ref={inputRef}
            />
            <CSSTransition
                in={isFocused}
                nodeRef={divRef}
                timeout={300}
                classNames="search-input"
                onExited={() => {
                    const input = inputRef.current;
                    if (input) input.value = '';

                    setFilter([]);
                    setSearch('');
                }}
                unmountOnExit
            >
                <div
                    className="absolute left-0 top-[calc(100%+4px)] z-20 flex flex-col gap-2 w-full bg-bg-secondary rounded-b-md p-2 overflow-x-hidden overflow-y-auto max-h-[calc(100vh-80px)]"
                    ref={divRef}
                >
                    {tasks.length > 0 && (
                        <ul className="flex flex-wrap gap-2 w-full overflow-y-auto max-h-100 p-2">
                            {tasks.map(t => (
                                <li key={t.id} className="w-full">
                                    <button className="flex flex-col gap-2 text-left w-full bg-bg-neutral hover:bg-bg-primary p-2 rounded-sm border border-bg-neutral-lighter text-sm cursor-pointer text-gray-400">
                                        <p className="text-text-primary">{t.title}</p>
                                        <Markdown>{t.body}</Markdown>
                                        <b className="text-text-neutral">/ {t.list.name}</b>
                                    </button>
                                </li>
                            ))}
                        </ul>
                    )}
                    <ul className=" flex flex-wrap gap-2 w-full bg-bg-secondary rounded-b-md p-2 max-h-32 overflow-x-hidden overflow-y-auto">
                        {filters.map((f, i) => (
                            <li key={i}>
                                <button
                                    style={{ backgroundColor: f.color }}
                                    className={clsx(
                                        'py-0.5 px-2 rounded-sm cursor-pointer border-2 border-text-secondary/0 text-text-primary',
                                        filter.some(el => el.name === f.name) &&
                                            'border-text-secondary/100',
                                    )}
                                    onClick={() => handleFilter(f)}
                                >
                                    {f.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            </CSSTransition>
        </div>
    );
}
