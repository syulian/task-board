'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { IBoardLink, IBoardsGroup, useBoardDragAndDropContext } from '@entities/Board';
import { PAGES } from '@shared/config';
import { useDragAndDrop } from '@shared/lib';
import { DropDownContainer, ListDropDown } from '@shared/ui';

interface IMenuItemProps {
    group: IBoardsGroup;
    board: IBoardLink;
    isExpanded: boolean;
}

export default function BoardLink({ group, board, isExpanded }: IMenuItemProps) {
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
                href={PAGES.BOARD(board.id)}
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
                    board.name
                ) : (
                    <p className="w-6 text-center bg-surface-light rounded-full">
                        {Array.from(board.name)[0] ?? '?'}
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
