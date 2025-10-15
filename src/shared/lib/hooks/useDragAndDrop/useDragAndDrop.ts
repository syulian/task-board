'use client';
import { Dispatch, DragEvent, SetStateAction, useState } from 'react';
import GroupSchema from '@shared/types/GroupSchema';
import ItemSchema from '@shared/types/ItemSchema';

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
    onReorder?: (updated: TG[]) => void,
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

        setGroups(prev => {
            const updated = prev.map(g => {
                let updatedItems = g.items.filter(b => b.id !== currentItem.id);

                if (g.id === group.id) {
                    const dropIndex = updatedItems.indexOf(item);

                    updatedItems.splice(dropIndex, 0, currentItem);
                    updatedItems = updatedItems.map((b, i) => ({ ...b, order: i }));
                }

                return {
                    ...g,
                    items: updatedItems,
                };
            });

            onReorder?.(updated);
            return updated;
        });

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
