'use client';
import { clsx } from 'clsx';
import debounce from 'debounce';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { CSSTransition } from 'react-transition-group';
import FILTERS from '@features/SearchInput/consts/filters';
import OS from '@features/SearchInput/consts/os';
import './search-input.animation.css';
import { useGetLabelsQuery, useGetTasksQuery } from '@shared/types/generated/graphql';

type FilterSchema = {
    id: string;
    name: string;
    color: string;
};

export default function SearchInput() {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const [command, setCommand] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [filter, setFilter] = useState<FilterSchema[]>([]);
    const [search, setSearch] = useState('');

    const divRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const { data: dataLabels } = useGetLabelsQuery({
        variables: { boardId: boardId ?? '' },
        skip: !isFocused || !boardId,
    });

    const labels = dataLabels?.getLabels ?? [];

    const { data: dataTasks } = useGetTasksQuery({
        skip: !isFocused || !boardId || (!filter.length && !search.length),
        fetchPolicy: 'network-only',
        variables: {
            filters: filter.map(f => f.id).filter(id => FILTERS.includes(id)),
            labels: filter.map(f => f.id).filter(id => !FILTERS.includes(id)),
            search: search,
            boardId: boardId ?? '',
        },
    });

    const tasks = dataTasks?.getTasks ?? [];

    const filters = [
        {
            id: 'NO_LABEL',
            name: 'No Label',
            color: '#323232',
        },
        {
            id: 'DUE_DATE',
            name: 'Due Date',
            color: '#323232',
        },
        {
            id: 'COMPLETE',
            name: 'Complete',
            color: '#323232',
        },
        ...labels,
    ];

    const handleFilter = (newFilter: FilterSchema) => {
        setFilter(prev => {
            const exists = prev.some(el => el.id === newFilter.id);
            return exists ? prev.filter(el => el.id !== newFilter.id) : [...prev, newFilter];
        });
    };

    const onChange = debounce((event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    }, 300);

    useEffect(() => {
        const handleFocus = (event: KeyboardEvent) => {
            if (event.metaKey && event.key.toLowerCase() === 'f') {
                event.preventDefault();
                inputRef.current?.focus();
                inputRef.current?.select();
            }
        };

        window.addEventListener('keydown', handleFocus);
        return () => window.removeEventListener('keydown', handleFocus);
    }, []);

    useEffect(() => {
        const userAgent = navigator.userAgent.toLowerCase();

        for (const n of OS) {
            if (userAgent.includes(n)) {
                setCommand(userAgent.includes('mac') ? ' or use ⌘ F' : ' or use ⊞ F');
                break;
            }
        }
    }, []);

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
                className="w-full outline-none text-sm caret-bg-neutral h-6"
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
