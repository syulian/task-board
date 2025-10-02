'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IBoard, IBoardsGroup } from '@entities/Board';
import useBoardLink from '@entities/Board/lib/hooks/useBoardLink';
import useLinkContextMenu from '@entities/Board/lib/hooks/useLinkContextMenu';
import { Router } from '@shared/config';
import { DropDownContainer, InlineInput, ListDropDown } from '@shared/ui';

interface IMenuItemProps {
    group: IBoardsGroup;
    board: IBoard;
    isExpanded: boolean;
}

export default function BoardLink({ group, board, isExpanded }: IMenuItemProps) {
    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop, currentItem } =
        useBoardLink(group, board);

    const { disabled, isOpen, setIsOpen, handleBoardRename, contextMenu } =
        useLinkContextMenu(board);

    return (
        <>
            <Link
                href={Router.BOARD(board.id)}
                className={clsx(
                    'w-full py-1.5 transition duration-200 ease-in-out cursor-pointer rounded-lg pr-4 hover:bg-bg-neutral truncate',
                    isExpanded ? 'pl-12' : 'pl-4',
                    isDragOver && currentItem && 'bg-bg-neutral',
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
                    !disabled ? (
                        <InlineInput
                            value={board.name}
                            disabled={disabled}
                            onBlur={handleBoardRename}
                        />
                    ) : (
                        board.name
                    )
                ) : (
                    <p className="w-6 text-center bg-bg-neutral rounded-full">
                        {Array.from(board.name)[0] ?? '?'}
                    </p>
                )}
            </Link>
            <DropDownContainer
                isOpen={isOpen && isExpanded}
                setIsOpen={() => setIsOpen(false)}
                className="right-0 top-0"
            >
                <ListDropDown list={contextMenu} />
            </DropDownContainer>
        </>
    );
}
