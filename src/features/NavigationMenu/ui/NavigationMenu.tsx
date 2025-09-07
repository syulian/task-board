'use client';
import React, { useMemo, useRef, useState } from 'react';
import { HiOutlinePlusSmall, HiMiniChevronDown, HiMiniChevronRight } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { BoardItem, BoardItemSchema, BoardsGroupSchema } from '@entities/Board';
import { Tooltip } from '@shared/ui';
import './list.animation.css';

interface INavigationMenuProps {
    board: BoardsGroupSchema;
    isExpanded: boolean;
}

export default function NavigationMenu({ board, isExpanded }: INavigationMenuProps) {
    const [isOpen, setIsOpen] = useState(true);
    const listRef = useRef(null);

    const sortBoards = (a: BoardItemSchema, b: BoardItemSchema): number => {
        return a.order - b.order;
    };

    const sortedBoards = useMemo<BoardItemSchema[]>(
        () => [...board.boards].sort(sortBoards),
        [board],
    );

    return (
        <section>
            <Tooltip text={board.name} isExpanded={isExpanded}>
                <div className="flex items-center w-full rounded-lg hover:bg-surface-light text-gray-300 font-bold transition duration-300 ease-in-out">
                    <button
                        className="flex items-center gap-1.5 py-1.5 px-4 flex-grow text-left cursor-pointer truncate"
                        onClick={() => setIsOpen(prev => !prev)}
                    >
                        {isOpen ? (
                            <HiMiniChevronDown aria-hidden="true" className="min-w-6 min-h-6" />
                        ) : (
                            <HiMiniChevronRight aria-hidden="true" className="min-w-6 min-h-6" />
                        )}
                        {isExpanded && <p>{board.name}</p>}
                    </button>
                    {isExpanded && (
                        <button className="ml-auto py-1.5 px-4 cursor-pointer text-white hover:bg-surface-lighter rounded-lg absolute left-[251px]">
                            <HiOutlinePlusSmall aria-hidden="true" size={24} />
                        </button>
                    )}
                </div>
            </Tooltip>
            <CSSTransition
                in={isOpen}
                nodeRef={listRef}
                timeout={300}
                classNames="list"
                unmountOnExit
            >
                <div className="flex flex-col overflow-y-scroll max-h-125" ref={listRef}>
                    {sortedBoards.map((b, index) => (
                        <Tooltip key={index} text={b.text} isExpanded={isExpanded}>
                            <BoardItem
                                id={board.id}
                                isExpanded={isExpanded}
                                board={b}
                                key={index}
                            />
                        </Tooltip>
                    ))}
                </div>
            </CSSTransition>
        </section>
    );
}
