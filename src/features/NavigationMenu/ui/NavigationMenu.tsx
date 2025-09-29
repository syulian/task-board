'use client';
import { clsx } from 'clsx';
import React, { useRef } from 'react';
import { HiOutlinePlusSmall, HiMiniChevronDown, HiMiniChevronRight } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import useGroupContextMenu from '@features/NavigationMenu/lib/hooks/useGroupContextMenu';
import {
    BoardLink,
    IBoardsGroup,
    AddBoardDropDown,
    useBoardDragAndDropContext,
    IBoardLink,
} from '@entities/Board';
import { useParentDragAndDrop, useSortedItems } from '@shared/lib';
import { DropDownContainer, InlineInput, ListDropDown, Tooltip } from '@shared/ui';
import './list.animation.css';

interface INavigationMenuProps {
    group: IBoardsGroup;
    isExpanded: boolean;
}

export default function NavigationMenu({ group, isExpanded }: INavigationMenuProps) {
    const listRef = useRef(null);

    const { currentItem, setGroups, currentGroup } = useBoardDragAndDropContext();
    const { onDragOver, onDrop } = useParentDragAndDrop(group, {
        currentItem,
        setGroups,
        currentGroup,
    });

    const { disabled, handleBoardsGroupRename, contextMenu, isOpen, setIsOpenField } =
        useGroupContextMenu(group);
    const sortedItems = useSortedItems<IBoardLink>(group.items);

    return (
        <section className="relative">
            <Tooltip text={group.name} isExpanded={isExpanded}>
                <div className="flex items-center w-full rounded-lg hover:bg-bg-neutral font-bold transition duration-300 ease-in-out">
                    <button
                        className="flex items-center gap-1.5 py-1.5 px-4 flex-grow text-left cursor-pointer truncate"
                        onClick={() => setIsOpenField('group', !isOpen.group)}
                        onContextMenu={event => {
                            event.preventDefault();
                            setIsOpenField('menu', !isOpen.menu);
                        }}
                    >
                        {isOpen.group ? (
                            <HiMiniChevronDown aria-hidden="true" className="min-w-6 min-h-6" />
                        ) : (
                            <HiMiniChevronRight aria-hidden="true" className="min-w-6 min-h-6" />
                        )}
                        {!disabled ? (
                            <InlineInput
                                value={group.name}
                                disabled={disabled}
                                onBlur={handleBoardsGroupRename}
                            />
                        ) : (
                            group.name
                        )}
                    </button>
                    {isExpanded && (
                        <button
                            className="ml-auto py-1.5 px-4 cursor-pointer text-text-primary hover:bg-bg-neutral-lighter rounded-lg absolute left-[251px]"
                            onClick={() => setIsOpenField('add', true)}
                        >
                            <HiOutlinePlusSmall aria-hidden="true" size={24} />
                        </button>
                    )}
                </div>
            </Tooltip>
            <CSSTransition
                in={isOpen.group}
                nodeRef={listRef}
                timeout={300}
                classNames="list"
                unmountOnExit
            >
                <div
                    className={clsx('flex flex-col', !group.items?.length && 'h-9')}
                    ref={listRef}
                    onDragOver={onDragOver}
                    onDrop={onDrop}
                >
                    {sortedItems?.map((b, index) => (
                        <Tooltip key={b.id} text={b.name} isExpanded={isExpanded}>
                            <BoardLink
                                group={group}
                                isExpanded={isExpanded}
                                board={b}
                                key={index}
                            />
                        </Tooltip>
                    ))}
                </div>
            </CSSTransition>
            <DropDownContainer
                isOpen={isOpen.add}
                setIsOpen={() => setIsOpenField('add', false)}
                className="right-0 top-0"
            >
                <AddBoardDropDown groupId={group.id} />
            </DropDownContainer>
            <DropDownContainer
                isOpen={isOpen.menu && isExpanded}
                setIsOpen={() => setIsOpenField('menu', false)}
                className="right-0 top-0"
            >
                <ListDropDown list={contextMenu} />
            </DropDownContainer>
        </section>
    );
}
