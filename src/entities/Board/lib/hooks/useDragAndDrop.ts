import { DragEvent, useState } from 'react';
import { BoardItemSchema, BoardsGroupSchema, useBoardContext } from '@entities/Board';

const useDragAndDrop = (group: BoardsGroupSchema, board: BoardItemSchema) => {
    const [isDragOver, setIsDragOver] = useState(false);

    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } =
        useBoardContext();

    const onDragOver = (event: DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        setIsDragOver(true);
    };

    const onDragLeave = () => {
        setIsDragOver(false);
    };

    const onDragStart = () => {
        setCurrentGroup(group);
        setCurrentItem(board);
    };

    const onDragEnd = () => {
        setCurrentGroup(null);
        setCurrentItem(null);
        setIsDragOver(false);
    };

    const onDrop = (event: DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        if (!currentGroup || !currentItem) return;

        setGroups(prev =>
            prev.map(g => {
                let updatedBoards = g.boards.filter(b => b.id !== currentItem.id);

                if (g.id === group.id) {
                    const dropIndex = updatedBoards.findIndex(b => b.id === board.id);
                    const newItem = { ...currentItem, order: board.order - 1 };

                    updatedBoards.splice(dropIndex, 0, newItem);

                    updatedBoards = updatedBoards.map((b, i) => ({ ...b, order: i }));
                }

                return {
                    ...g,
                    boards: updatedBoards,
                };
            }),
        );

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
