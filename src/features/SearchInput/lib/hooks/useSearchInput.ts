import debounce from 'debounce';
import { useParams } from 'next/navigation';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import FILTERS from '@features/SearchInput/consts/filters';
import OS from '@features/SearchInput/consts/os';
import { useGetLabelsQuery, useGetTasksQuery } from '@shared/types';

type FilterSchema = {
    id: string;
    name: string;
    color: string;
};

const useSearchInput = () => {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const [command, setCommand] = useState('');
    const [isFocused, setIsFocused] = useState(false);

    const [filter, setFilter] = useState<FilterSchema[]>([]);
    const [search, setSearch] = useState('');

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

    return {
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
    };
};

export default useSearchInput;
