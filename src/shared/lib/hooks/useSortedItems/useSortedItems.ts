import { useMemo } from 'react';
import { ItemSchema } from '@shared/types';

const useSortedItems = <T extends ItemSchema>(items: (T | null | undefined)[]): T[] => {
    return useMemo(() => {
        const filtered = items.filter(Boolean) as T[];
        return filtered.length ? [...filtered].sort((a, b) => a.order - b.order) : [];
    }, [items]);
};

export default useSortedItems;
