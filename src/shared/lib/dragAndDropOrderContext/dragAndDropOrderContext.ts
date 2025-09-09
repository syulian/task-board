import { createContext, useContext, Dispatch, SetStateAction } from 'react';
import { ItemSchema, GroupSchema } from '@shared/types';

export interface IDragAndDropOrderContext<TI extends ItemSchema, TO extends GroupSchema<TI>> {
    currentOrder: TO | null;
    setCurrentOrder: (group: TO | null) => void;
    setOrders: Dispatch<SetStateAction<TO[]>>;
}

export function createDragAndDropOrderContext<TI extends ItemSchema, TO extends GroupSchema<TI>>() {
    const Context = createContext<IDragAndDropOrderContext<TI, TO> | null>(null);

    const useDragAndDropOrderContext = () => {
        const ctx = useContext(Context);
        if (!ctx) throw new Error('createDragAndDropOrderContext must be used within a Provider');

        return ctx;
    };

    return [Context, useDragAndDropOrderContext] as const;
}
