'use client';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useRef } from 'react';
import { HiOutlinePlusSmall, HiMiniChevronDown, HiMiniChevronRight } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import useGroupContextMenu from '@features/NavigationMenu/lib/hooks/useGroupContextMenu';
import {
    BoardLink,
    BoardsGroup,
    AddBoardDropDown,
    useBoardDragAndDropContext,
    useBoardOnOrder,
} from '@entities/Board';
import { useParentDragAndDrop, useSortedItems } from '@shared/lib';
import { DropDownContainer, InlineInput, ListDropDown, Tooltip } from '@shared/ui';
import './list.animation.css';

interface INavigationMenuProps {
    group: BoardsGroup;
    isExpanded: boolean;
}

export default function NavigationMenu({ group, isExpanded }: INavigationMenuProps) {
    const listRef = useRef(null);

    const { currentItem, setGroups, currentGroup } = useBoardDragAndDropContext();
    const { onDragOver, onDrop } = useParentDragAndDrop(
        group,
        {
            currentItem,
            setGroups,
            currentGroup,
        },
        useBoardOnOrder(),
    );

    const { disabled, handleBoardsGroupRename, contextMenu, isOpen, setIsOpenField } =
        useGroupContextMenu(group);
    const sortedItems = useSortedItems(group?.items ?? []);

    const t = useTranslations('LeftSidebar');

    return (
        <section className="relative">
            <Tooltip text={group.name} isExpanded={isExpanded}>
                <div
                    className="flex items-center w-full hover:bg-bg-neutral font-bold rounded-lg"
                    data-testid="group-container"
                >
                    <button
                        className="flex items-center gap-1.5 py-1.5 px-4 flex-grow text-left cursor-pointer truncate rounded-lg"
                        onClick={() => setIsOpenField('group', !isOpen.group)}
                        onContextMenu={event => {
                            event.preventDefault();
                            setIsOpenField('menu', !isOpen.menu);
                        }}
                    >
                        {isOpen.group ? (
                            <HiMiniChevronDown className="min-w-6 min-h-6" />
                        ) : (
                            <HiMiniChevronRight className="min-w-6 min-h-6" />
                        )}
                        {isExpanded &&
                            (disabled ? (
                                group.name
                            ) : (
                                <InlineInput
                                    value={group.name}
                                    disabled={disabled}
                                    onBlur={handleBoardsGroupRename}
                                    ariaLabel={t('group.name')}
                                />
                            ))}
                    </button>
                    {isExpanded && (
                        <button
                            className="ml-auto py-1.5 px-4 cursor-pointer text-text-primary hover:bg-bg-neutral-lighter rounded-lg absolute left-[251px]"
                            onClick={() => setIsOpenField('add', true)}
                            aria-label={t('board.add.title')}
                        >
                            <HiOutlinePlusSmall size={24} />
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
