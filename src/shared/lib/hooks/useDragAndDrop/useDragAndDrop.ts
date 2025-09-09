import { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import { GroupSchema, ItemSchema } from '@shared/types';

const useDragAndDrop = <TI extends ItemSchema, TG extends GroupSchema<TI>>(
    group: TG,
    item: TI,
    ctx: {
        currentItem: TI | null;
        currentGroup: TG | null;
        setCurrentItem: (item: TI | null) => void;
        setCurrentGroup: (group: TG | null) => void;
        setGroups: Dispatch<SetStateAction<TG[]>>;
    },
) => {
    const [isDragOver, setIsDragOver] = useState(false);
    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } = ctx;

    const onDragOver = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        setIsDragOver(true);
    };

    const onDragLeave = () => {
        setIsDragOver(false);
    };

    const onDragStart = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();

        setCurrentGroup(group);
        setCurrentItem(item);
    };

    const onDragEnd = () => {
        setCurrentGroup(null);
        setCurrentItem(null);
        setIsDragOver(false);
    };

    const onDrop = (event: DragEvent<HTMLElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (!currentGroup || !currentItem) return;

        setGroups(prev =>
            prev.map(g => {
                let updatedItems = g.items.filter(b => b.id !== currentItem.id);

                if (g.id === group.id) {
                    const dropIndex = updatedItems.findIndex(b => b.id === item.id);
                    const newItem = { ...currentItem, order: item.order - 1 };

                    updatedItems.splice(dropIndex, 0, newItem);
                    updatedItems = updatedItems.map((b, i) => ({ ...b, order: i }));
                }

                return {
                    ...g,
                    items: updatedItems,
                };
            }),
        );

        setCurrentGroup(null);
        setCurrentItem(null);
        setIsDragOver(false);
    };

    return {
        isDragOver,
        onDragOver,
        onDragLeave,
        onDragStart,
        onDragEnd,
        onDrop,
    };
};

export default useDragAndDrop;
