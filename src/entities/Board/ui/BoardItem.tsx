import { clsx } from 'clsx';
import Link from 'next/link';
import React, { DragEvent, useState } from 'react';
import { BoardItemSchema } from '@entities/Board';
import { useBoardContext } from '@entities/Board/lib/hooks/useBoardContext';

interface IMenuItemProps {
    id: string;
    board: BoardItemSchema;
    isExpanded: boolean;
}

export default function BoardItem({ id, board, isExpanded }: IMenuItemProps) {
    const { currentItem, setCurrentItem, setBoardsList } = useBoardContext();
    const [isDragOver, setIsDragOver] = useState(false);

    const onDragOver = (event: DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();
        console.log(event.currentTarget.id);

        setIsDragOver(true);
    };

    const onDragLeave = () => {
        setIsDragOver(false);
    };

    const onDragStart = () => {
        setCurrentItem(board);
    };

    const onDragEnd = () => {
        setIsDragOver(false);
    };

    const onDrop = (event: DragEvent<HTMLAnchorElement>) => {
        event.preventDefault();

        setBoardsList(
            prev =>
                prev?.map(b => {
                    if (b.id === id) {
                        return {
                            ...b,
                            boards: b.boards.map(i => {
                                if (i.id === board.id) {
                                    return { ...i, order: currentItem?.order ?? i.order };
                                }
                                if (i.id === currentItem?.id) {
                                    return { ...i, order: board?.order ?? i.order };
                                }
                                return i;
                            }),
                        };
                    }
                    return b;
                }) ?? [],
        );

        setIsDragOver(false);
    };

    return (
        <Link
            href={board.href}
            className={clsx(
                'w-full py-1.5 transition duration-200 ease-in-out cursor-pointer rounded-lg pr-4 hover:bg-surface-light truncate',
                isExpanded ? 'pl-12' : 'pl-4',
                isDragOver ? 'bg-background-dark' : 'bg-surface-dark',
            )}
            draggable={true}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDrop={onDrop}
        >
            {isExpanded ? (
                board.text
            ) : (
                <p className="w-6 text-center bg-surface-light rounded-full">
                    {Array.from(board.text)[0] ?? '?'}
                </p>
            )}
        </Link>
    );
}
