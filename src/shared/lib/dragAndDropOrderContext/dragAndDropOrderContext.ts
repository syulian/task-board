'use client';
import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { ItemSchema } from '@shared/types';

export interface IDragAndDropOrderContext<TO extends ItemSchema> {
    currentOrder: TO | null;
    setCurrentOrder: (group: TO | null) => void;
    setOrders: Dispatch<SetStateAction<TO[]>>;
}

export function createDragAndDropOrderContext<TO extends ItemSchema>() {
    const Context = createContext<IDragAndDropOrderContext<TO> | null>(null);

    const useDragAndDropOrderContext = () => {
        const ctx = useContext(Context);
        if (!ctx) throw new Error('createDragAndDropOrderContext must be used within a Provider');

        return ctx;
    };

    return [Context, useDragAndDropOrderContext] as const;
}
