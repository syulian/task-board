import { Dispatch, DragEvent, SetStateAction } from 'react';
import { GroupSchema, ItemSchema } from '@shared/types';

const useParentDragAndDrop = <TI extends ItemSchema, TG extends GroupSchema<TI>>(
    group: TG,
    ctx: {
        currentItem: TI | null;
        currentGroup: TG | null;
        setGroups: Dispatch<SetStateAction<TG[]>>;
    },
) => {
    const { currentItem, setGroups, currentGroup } = ctx;

    const onDragOver = (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();
    };

    const onDrop = (event: DragEvent<HTMLDivElement>) => {
        event.stopPropagation();
        event.preventDefault();

        if (!currentGroup || !currentItem || group.items.length) return;

        setGroups(prev =>
            prev.map(g => {
                const updatedItems = g.items.filter(b => b.id !== currentItem.id);

                if (g.id === group.id) {
                    updatedItems.push({ ...currentItem, order: 0 });
                }

                return {
                    ...g,
                    items: updatedItems,
                };
            }),
        );
    };

    return {
        onDragOver,
        onDrop,
    };
};

export default useParentDragAndDrop;
