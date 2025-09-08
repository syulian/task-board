'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React from 'react';
import { BoardItemSchema, BoardsGroupSchema } from '@entities/Board';
import useDragAndDrop from '@entities/Board/lib/hooks/useDragAndDrop';

interface IMenuItemProps {
    group: BoardsGroupSchema;
    board: BoardItemSchema;
    isExpanded: boolean;
}

export default function BoardItem({ group, board, isExpanded }: IMenuItemProps) {
    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop } = useDragAndDrop(
        group,
        board,
    );

    return (
        <Link
            href={board.href}
            className={clsx(
                'w-full py-1.5 transition duration-200 ease-in-out cursor-pointer rounded-lg pr-4 hover:bg-surface-light truncate',
                isExpanded ? 'pl-12' : 'pl-4',
                isDragOver && 'bg-surface-light',
            )}
            draggable
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
