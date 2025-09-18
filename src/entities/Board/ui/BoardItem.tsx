'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { BoardLinkSchema, BoardsGroupSchema, useBoardDragAndDropContext } from '@entities/Board';
import { PAGES } from '@shared/config';
import { useDragAndDrop } from '@shared/lib';
import { DropDownContainer, ListDropDown } from '@shared/ui';

interface IMenuItemProps {
    group: BoardsGroupSchema;
    board: BoardLinkSchema;
    isExpanded: boolean;
}

export default function BoardItem({ group, board, isExpanded }: IMenuItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } =
        useBoardDragAndDropContext();

    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop } = useDragAndDrop(
        group,
        board,
        {
            currentItem,
            setGroups,
            setCurrentItem,
            setCurrentGroup,
            currentGroup,
        },
    );

    const editList = [
        {
            children: [
                {
                    label: 'Rename',
                    onClick: () => {},
                },
                {
                    label: 'Delete',
                    onClick: () => {},
                },
            ],
        },
    ];

    return (
        <>
            <Link
                href={PAGES.BOARD(board.href)}
                className={clsx(
                    'w-full py-1.5 transition duration-200 ease-in-out cursor-pointer rounded-lg pr-4 hover:bg-surface-light truncate',
                    isExpanded ? 'pl-12' : 'pl-4',
                    isDragOver && currentItem && 'bg-surface-light',
                )}
                draggable
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDrop={onDrop}
                onContextMenu={event => {
                    event.preventDefault();
                    setIsOpen(prev => !prev);
                }}
            >
                {isExpanded ? (
                    board.text
                ) : (
                    <p className="w-6 text-center bg-surface-light rounded-full">
                        {Array.from(board.text)[0] ?? '?'}
                    </p>
                )}
            </Link>
            <DropDownContainer
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
                className="right-0 top-0"
            >
                <ListDropDown list={editList} />
            </DropDownContainer>
        </>
    );
}
