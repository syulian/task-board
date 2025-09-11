'use client';
import { clsx } from 'clsx';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import {
    HiMiniChevronDoubleLeft,
    HiOutlinePlusCircle,
    HiOutlineCog8Tooth,
    HiOutlineCloud,
    HiOutlineUserCircle,
    HiMiniChevronDoubleRight,
    HiMiniCheck,
} from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { NavigationMenu } from '@features/NavigationMenu';
import { BoardDragAndDropContext, BoardLinkSchema, BoardsGroupSchema } from '@entities/Board';
import { DropDownContainer, DropDownList, NavButton, Tooltip } from '@shared/ui';
import './left-sidebar.animation.css';

export default function LeftSidebar() {
    const [currentItem, setCurrentItem] = useState<BoardLinkSchema | null>(null);
    const [currentGroup, setCurrentGroup] = useState<BoardsGroupSchema | null>(null);

    const [isExpanded, setIsExpanded] = useState(true);
    const [isOpen, setIsOpen] = useState({
        settings: false,
        themes: false,
        languages: false,
    });

    const sidebarRef = useRef<HTMLElement>(null);

    const [groups, setGroups] = useState<BoardsGroupSchema[]>([
        {
            id: '1',
            order: 1,
            name: 'My Boards',
            items: [
                {
                    id: '1',
                    order: 1,
                    href: '/1',
                    text: '💀 Website',
                },
                {
                    id: '2',
                    order: 2,
                    href: '/2',
                    text: '🎃 PWA',
                },
            ],
        },
        {
            id: '2',
            order: 2,
            name: 'Another Boards',
            items: [
                {
                    id: '3',
                    order: 1,
                    href: '/3',
                    text: '1',
                },
                {
                    id: '4',
                    order: 2,
                    href: '/4',
                    text: '2',
                },
                {
                    id: '5',
                    order: 3,
                    href: '/5',
                    text: '3',
                },
                {
                    id: '6',
                    order: 4,
                    href: '/6',
                    text: '4',
                },
            ],
        },
    ]);

    const dropDownList = [
        {
            children: [
                {
                    label: 'About',
                    onClick: () => {},
                },
                {
                    label: 'Feedback',
                    onClick: () => {},
                },
            ],
        },
        {
            children: [
                {
                    label: 'View',
                    onClick: () => {
                        setIsOpen(prev => ({
                            ...prev,
                            settings: false,
                            themes: true,
                        }));
                    },
                },
                {
                    label: 'Language',
                    onClick: () => {
                        setIsOpen(prev => ({
                            ...prev,
                            settings: false,
                            languages: true,
                        }));
                    },
                },
            ],
        },
        {
            children: [
                {
                    label: 'Release Notes',
                    onClick: () => {},
                },
            ],
        },
    ];

    const themesList = [
        {
            title: 'Theme',
            children: [
                {
                    label: 'Light',
                    onClick: () => {},
                },
                {
                    label: (
                        <>
                            Dark <HiMiniCheck size={18} fontWeight="bold" color="white" />
                        </>
                    ),
                    onClick: () => {},
                },
                {
                    label: 'System',
                    onClick: () => {},
                },
            ],
        },
    ];

    const languagesList = [
        {
            title: 'Language',
            children: [
                {
                    label: (
                        <>
                            English <HiMiniCheck size={18} fontWeight="bold" color="white" />
                        </>
                    ),
                    onClick: () => {},
                },
                {
                    label: 'Ukraine',
                    onClick: () => {},
                },
            ],
        },
    ];

    return (
        <CSSTransition in={isExpanded} nodeRef={sidebarRef} timeout={300} classNames="left-sidebar">
            <aside
                className="flex flex-col max-w-85 w-full bg-surface-dark h-screen border-surface-light border-r"
                ref={sidebarRef}
            >
                <div className="flex flex-col gap-2 p-4 overflow-y-scroll overflow-x-hidden">
                    <Tooltip text="Task Board" isExpanded={isExpanded}>
                        <NavButton onClick={() => {}}>
                            <Image
                                alt="logo"
                                src="/icons/apple-touch-icon.png"
                                width={24}
                                height={24}
                            />
                            {isExpanded && <p>Task Board</p>}
                        </NavButton>
                    </Tooltip>
                    <Tooltip text="Profile" isExpanded={isExpanded}>
                        <NavButton onClick={() => {}}>
                            <HiOutlineUserCircle aria-hidden="true" className="min-w-6 min-h-6" />
                            {isExpanded && <p>tony_redgrave</p>}
                        </NavButton>
                    </Tooltip>
                    <Tooltip text="Synced" isExpanded={isExpanded}>
                        <NavButton onClick={() => {}}>
                            <HiOutlineCloud aria-hidden="true" className="min-w-6 min-h-6" />
                            {isExpanded && <p>Synced</p>}
                        </NavButton>
                    </Tooltip>
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
                <div className="flex flex-col gap-2 mt-auto p-4 border-t border-surface-light sticky z-30 bottom-0 bg-surface-dark">
                    <Tooltip text="Add Group" isExpanded={isExpanded}>
                        <NavButton onClick={() => {}} ariaLabel="Add Group">
                            <HiOutlinePlusCircle aria-hidden="true" className="min-w-6 min-h-6" />
                            {isExpanded && <p>Add Group</p>}
                        </NavButton>
                    </Tooltip>
                    <div className="flex items-center rounded-lg hover:bg-surface-light transition duration-300 ease-in-out">
                        {isExpanded && (
                            <div className="relative w-full">
                                <button
                                    className="flex items-center gap-1.5 py-1.5 px-4 w-full text-left font-bold cursor-pointer"
                                    onClick={() =>
                                        setIsOpen(prev => ({
                                            ...prev,
                                            settings: !prev.settings,
                                        }))
                                    }
                                >
                                    <HiOutlineCog8Tooth aria-hidden="true" size={24} />
                                    <p>Settings</p>
                                </button>
                                <DropDownContainer
                                    isOpen={isOpen.settings}
                                    setIsOpen={() => {
                                        setIsOpen(prev => ({
                                            ...prev,
                                            settings: false,
                                        }));
                                    }}
                                    className="left-0 bottom-full"
                                >
                                    <DropDownList list={dropDownList} />
                                </DropDownContainer>
                                <DropDownContainer
                                    isOpen={isOpen.themes}
                                    setIsOpen={() => {
                                        setIsOpen(prev => ({
                                            ...prev,
                                            themes: false,
                                        }));
                                    }}
                                    className="left-0 bottom-full"
                                >
                                    <DropDownList list={themesList} />
                                </DropDownContainer>
                                <DropDownContainer
                                    isOpen={isOpen.languages}
                                    setIsOpen={() => {
                                        setIsOpen(prev => ({
                                            ...prev,
                                            languages: false,
                                        }));
                                    }}
                                    className="left-0 bottom-full"
                                >
                                    <DropDownList list={languagesList} />
                                </DropDownContainer>
                            </div>
                        )}
                        <button
                            className={clsx(
                                'py-1.5 px-4 cursor-pointer text-white hover:bg-surface-lighter rounded-lg',
                                isExpanded && 'ml-auto',
                            )}
                            onClick={() => setIsExpanded(prev => !prev)}
                        >
                            {isExpanded ? (
                                <HiMiniChevronDoubleLeft aria-hidden="true" size={24} />
                            ) : (
                                <HiMiniChevronDoubleRight aria-hidden="true" size={24} />
                            )}
                        </button>
                    </div>
                </div>
            </aside>
        </CSSTransition>
    );
}
