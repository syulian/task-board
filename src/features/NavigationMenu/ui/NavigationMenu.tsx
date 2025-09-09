'use client';
import { clsx } from 'clsx';
import React, { useRef, useState } from 'react';
import { HiOutlinePlusSmall, HiMiniChevronDown, HiMiniChevronRight } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { BoardItem, BoardsGroupSchema, useBoardDragAndDropContext } from '@entities/Board';
import { useParentDragAndDrop } from '@shared/lib';
import { Tooltip } from '@shared/ui';
import './list.animation.css';

interface INavigationMenuProps {
    group: BoardsGroupSchema;
    isExpanded: boolean;
}

export default function NavigationMenu({ group, isExpanded }: INavigationMenuProps) {
    const [isOpen, setIsOpen] = useState(true);
    const listRef = useRef(null);

    const { currentItem, setGroups, currentGroup } = useBoardDragAndDropContext();
    const { onDragOver, onDrop } = useParentDragAndDrop(group, {
        currentItem,
        setGroups,
        currentGroup,
    });

    return (
        <section>
            <Tooltip text={group.name} isExpanded={isExpanded}>
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
                        {isExpanded && <p>{group.name}</p>}
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
                <div
                    className={clsx(
                        'flex flex-col overflow-y-scroll max-h-125',
                        !group.items.length && 'h-9',
                    )}
                    ref={listRef}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    {group.items.map((b, index) => (
                        <Tooltip key={index} text={b.text} isExpanded={isExpanded}>
                            <BoardItem
                                group={group}
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
