'use client';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import {
    HiMiniChevronDoubleLeft,
    HiMiniChevronDoubleRight,
    HiOutlinePlusCircle,
} from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import useLeftSidebar from '@widgets/LeftSidebar/lib/hooks/useLeftSidebar';
import Settings from '@widgets/LeftSidebar/ui/Settings';
import { Auth } from '@features/Auth';
import { NavigationMenu } from '@features/NavigationMenu';
import { AddGroupDropDown, BoardDragAndDropContext, Board, BoardsGroup } from '@entities/Board';
import logo from '@shared/assets/images/website-logo.png';
import { DropDownContainer, NavButton, Tooltip } from '@shared/ui';
import './left-sidebar.animation.css';

export default function LeftSidebar() {
    const [currentItem, setCurrentItem] = useState<Board | null>(null);
    const [currentGroup, setCurrentGroup] = useState<BoardsGroup | null>(null);
    const [isExpanded, setIsExpanded] = useState(true);

    const sidebarRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const { groups, setGroups, status, isOpen, setIsOpenField } = useLeftSidebar();

    const t = useTranslations('LeftSidebar');

    return (
        <CSSTransition in={isExpanded} nodeRef={sidebarRef} timeout={300} classNames="left-sidebar">
            <aside
                className="flex flex-col max-w-85 w-full bg-bg-secondary h-screen border-bg-neutral border-r"
                ref={sidebarRef}
            >
                <div className="flex flex-col gap-2 p-4 overflow-y-scroll overflow-x-hidden h-full">
                    <Tooltip text="TaskBoard" isExpanded={isExpanded}>
                        <NavButton onClick={() => router.push('/')}>
                            <Image alt={t('logo')} src={logo} width={24} height={24} priority />
                            {isExpanded && <p>{t('logo')}</p>}
                        </NavButton>
                    </Tooltip>
                    <Auth isExpanded={isExpanded} />
                    <BoardDragAndDropContext
                        value={{
                            currentItem: currentItem,
                            setCurrentItem: setCurrentItem,
                            currentGroup: currentGroup,
                            setCurrentGroup: setCurrentGroup,
                            setGroups: setGroups,
                        }}
                    >
                        {groups.map(g => (
                            <NavigationMenu key={g.id} group={g} isExpanded={isExpanded} />
                        ))}
                    </BoardDragAndDropContext>
                </div>
                <div className="flex flex-col gap-2 mt-auto p-4 border-t border-bg-neutral sticky z-30 bottom-0 bg-bg-secondary">
                    <Tooltip text={t('groups.addGroup')} isExpanded={isExpanded}>
                        {status === 'authenticated' && (
                            <NavButton
                                onClick={() => setIsOpenField('add', true)}
                                ariaLabel={t('groups.addGroup')}
                            >
                                <HiOutlinePlusCircle
                                    className="min-w-6 min-h-6"
                                />
                                {isExpanded && <p>{t('groups.addGroup')}</p>}
                            </NavButton>
                        )}
                        <DropDownContainer
                            isOpen={isOpen.add}
                            setIsOpen={() => setIsOpenField('add', false)}
                            className="left-0 bottom-0"
                        >
                            <AddGroupDropDown />
                        </DropDownContainer>
                    </Tooltip>
                    <div className="flex items-center hover:bg-bg-neutral rounded-lg">
                        {isExpanded && <Settings />}
                        <button
                            aria-label={isExpanded ? t('collapse') : t('expand')}
                            className={clsx(
                                'py-1.5 px-4 cursor-pointer text-text-primary hover:bg-bg-neutral-lighter rounded-lg',
                                isExpanded && 'ml-auto',
                            )}
                            onClick={() => setIsExpanded(prev => !prev)}
                        >
                            {isExpanded ? (
                                <HiMiniChevronDoubleLeft size={24} />
                            ) : (
                                <HiMiniChevronDoubleRight size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </CSSTransition>
    );
}
