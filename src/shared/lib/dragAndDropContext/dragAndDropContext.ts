'use client';
import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { ItemSchema, GroupSchema } from '@shared/types';

export interface IDragAndDropContext<TI extends ItemSchema, TG extends GroupSchema<TI>> {
    currentItem: TI | null;
    setCurrentItem: Dispatch<SetStateAction<TI | null>>;
    currentGroup: TG | null;
    setCurrentGroup: Dispatch<SetStateAction<TG | null>>;
    setGroups: Dispatch<SetStateAction<TG[]>>;
}

export function createDragAndDropContext<TI extends ItemSchema, TG extends GroupSchema<TI>>() {
    const Context = createContext<IDragAndDropContext<TI, TG> | null>(null);

    const useDragAndDropContext = () => {
        const ctx = useContext(Context);
        if (!ctx) throw new Error('useDragAndDropContext must be used within a Provider');

        return ctx;
    };

    return [Context, useDragAndDropContext] as const;
}
