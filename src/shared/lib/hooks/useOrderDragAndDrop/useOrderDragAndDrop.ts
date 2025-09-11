import { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import { ItemSchema } from '@shared/types';

const useOrderDragAndDrop = <TO extends ItemSchema>(
    group: TO,
    ctx: {
        currentOrder: TO | null;
        setCurrentOrder: (group: TO | null) => void;
        setOrders: Dispatch<SetStateAction<TO[]>>;
    },
) => {
    const [isDragOverOrder, setIsDragOverOrder] = useState(false);
    const { currentOrder, setCurrentOrder, setOrders } = ctx;

    const onDragOverOrder = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setIsDragOverOrder(true);
    };

    const onDragLeaveOrder = () => {
        setIsDragOverOrder(false);
    };

    const onDragStartOrder = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        setCurrentOrder(group);
    };

    const onDragEndOrder = () => {
        setCurrentOrder(null);
        setIsDragOverOrder(false);
    };

    const onDropOrder = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (!currentOrder) return;

        setOrders(prev => {
            let updatedOrders = prev.filter(g => g.id !== currentOrder.id);

            const dropIndex = updatedOrders.findIndex(g => g.id === group.id);
            const newItem = { ...currentOrder, order: group.order - 1 };

            updatedOrders.splice(dropIndex, 0, newItem);
            updatedOrders = updatedOrders.map((g, i) => ({ ...g, order: i }));

            return updatedOrders;
        });

        setCurrentOrder(null);
        setIsDragOverOrder(false);
    };

    return {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    };
};

export default useOrderDragAndDrop;
