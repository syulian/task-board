'use client';
import { useQuery } from '@apollo/client/react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import {
    HiMiniChevronDoubleLeft,
    HiOutlinePlusCircle,
    HiOutlineCog8Tooth,
    HiOutlineUserCircle,
    HiMiniChevronDoubleRight,
    HiMiniCheck,
} from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { GET_BOARDS_GROUPS } from '@widgets/LeftSidebar/api/getBoardsGroups';
import { NavigationMenu } from '@features/NavigationMenu';
import {
    BoardDragAndDropContext,
    IBoardLink,
    IBoardsGroup,
    AddGroupDropDown,
} from '@entities/Board';
import { SignInPopup, SignUpPopup } from '@entities/User';
import logo from '@shared/assets/images/website-logo.png';
import { createStateController } from '@shared/lib';
import { DropDownContainer, ListDropDown, NavButton, Popup, Tooltip } from '@shared/ui';
import './left-sidebar.animation.css';

export default function LeftSidebar() {
    const [currentItem, setCurrentItem] = useState<IBoardLink | null>(null);
    const [currentGroup, setCurrentGroup] = useState<IBoardsGroup | null>(null);

    const [isExpanded, setIsExpanded] = useState(true);
    const [isOpen, setIsOpen] = useState({
        settings: false,
        themes: false,
        languages: false,
        signIn: false,
        signUp: false,
        add: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const sidebarRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const { data, loading } = useQuery<{ getBoardsGroups: IBoardsGroup[] }>(GET_BOARDS_GROUPS);
    const [groups, setGroups] = useState<IBoardsGroup[]>([]);

    useEffect(() => {
        if (!loading && data?.getBoardsGroups) {
            setGroups(data.getBoardsGroups);
        }
    }, [data, loading]);

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
                        setIsOpenField('settings', false);
                        setIsOpenField('themes', true);
                    },
                },
                {
                    label: 'Language',
                    onClick: () => {
                        setIsOpenField('settings', false);
                        setIsOpenField('languages', true);
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

    const openSignUp = () => {
        setIsOpenField('signIn', false);
        setIsOpenField('signUp', true);
    };

    const openSignIn = () => {
        setIsOpenField('signUp', false);
        setIsOpenField('signIn', true);
    };

    return (
        <CSSTransition in={isExpanded} nodeRef={sidebarRef} timeout={300} classNames="left-sidebar">
            <aside
                className="flex flex-col max-w-85 w-full bg-surface-dark h-screen border-surface-light border-r"
                ref={sidebarRef}
            >
                <div className="flex flex-col gap-2 p-4 overflow-y-scroll overflow-x-hidden h-full">
                    <Tooltip text="TaskBoard" isExpanded={isExpanded}>
                        <NavButton onClick={() => router.push('/')}>
                            <Image alt="logo" src={logo} width={24} height={24} priority />
                            {isExpanded && <p>TaskBoard</p>}
                        </NavButton>
                    </Tooltip>
                    <Tooltip text="Profile" isExpanded={isExpanded}>
                        <NavButton onClick={() => setIsOpenField('signIn', true)}>
                            <HiOutlineUserCircle aria-hidden="true" className="min-w-6 min-h-6" />
                            {isExpanded && <p>Sign in</p>}
                        </NavButton>
                    </Tooltip>
                    <Popup isOpen={isOpen.signIn} setIsOpen={() => setIsOpenField('signIn', false)}>
                        <SignInPopup openSignUp={openSignUp} />
                    </Popup>
                    <Popup isOpen={isOpen.signUp} setIsOpen={() => setIsOpenField('signUp', false)}>
                        <SignUpPopup openSignIn={openSignIn} />
                    </Popup>
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
                        <NavButton
                            onClick={() => setIsOpenField('add', true)}
                            ariaLabel="Add Group"
                        >
                            <HiOutlinePlusCircle aria-hidden="true" className="min-w-6 min-h-6" />
                            {isExpanded && <p>Add Group</p>}
                        </NavButton>
                        <DropDownContainer
                            isOpen={isOpen.add}
                            setIsOpen={() => setIsOpenField('add', false)}
                            className="left-0 bottom-0"
                        >
                            <AddGroupDropDown />
                        </DropDownContainer>
                    </Tooltip>
                    <div className="flex items-center rounded-lg hover:bg-surface-light transition duration-300 ease-in-out">
                        {isExpanded && (
                            <div className="relative w-full">
                                <button
                                    className="flex items-center gap-1.5 py-1.5 px-4 w-full text-left font-bold cursor-pointer"
                                    onClick={() => setIsOpenField('settings', true)}
                                >
                                    <HiOutlineCog8Tooth
                                        aria-hidden="true"
                                        className="min-w-6 min-h-6"
                                    />
                                    <p>Settings</p>
                                </button>
                                <DropDownContainer
                                    isOpen={isOpen.settings}
                                    setIsOpen={() => setIsOpenField('settings', false)}
                                    className="left-0 bottom-full"
                                >
                                    <ListDropDown list={dropDownList} />
                                </DropDownContainer>
                                <DropDownContainer
                                    isOpen={isOpen.themes}
                                    setIsOpen={() => setIsOpenField('themes', false)}
                                    className="left-0 bottom-full"
                                >
                                    <ListDropDown list={themesList} />
                                </DropDownContainer>
                                <DropDownContainer
                                    isOpen={isOpen.languages}
                                    setIsOpen={() => setIsOpenField('languages', false)}
                                    className="left-0 bottom-full"
                                >
                                    <ListDropDown list={languagesList} />
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
