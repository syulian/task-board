import { useMemo } from 'react';
import ItemSchema from '../../../types/ItemSchema';

const useSortedItems = <T extends ItemSchema>(items: T[]) => {
    return useMemo(() => {
        return [...(items ?? [])].sort((a, b) => a.order - b.order);
    }, [items]);
};

export default useSortedItems;
