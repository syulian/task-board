'use client';
import { Dispatch, DragEvent, SetStateAction, useEffect, useRef } from 'react';
import { GroupSchema, ItemSchema } from '@shared/types';

const useParentDragAndDrop = <TI extends ItemSchema, TG extends GroupSchema<TI>>(
    group: TG,
    ctx: {
        currentItem: TI | null;
        currentGroup: TG | null;
        setGroups: Dispatch<SetStateAction<TG[]>>;
    },
    onReorder?: (updated: TG[]) => void,
) => {
    const lastUpdated = useRef<TG[]>(null);
    const { currentItem, setGroups, currentGroup } = ctx;

    useEffect(() => {
        if (lastUpdated.current) {
            onReorder?.(lastUpdated.current);
            lastUpdated.current = null;
        }
    }, [lastUpdated.current]);

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (!currentGroup || !currentItem || group?.items?.length) return;

        setGroups(prev => {
            const updated = prev.map(g => {
                const updatedItems = g?.items?.filter(b => b?.id !== currentItem.id);

                if (g.id === group.id) {
                    updatedItems?.push({ ...currentItem, order: 0 });
                }

                return {
                    ...g,
                    items: updatedItems,
                };
            });

            lastUpdated.current = updated;
            return updated;
        });
    };

    return {
        onDragOver,
        onDrop,
    };
};

export default useParentDragAndDrop;
