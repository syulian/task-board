'use client';
import { useApolloClient, useQuery } from '@apollo/client/react';
import { clsx } from 'clsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import {
    HiMiniChevronDoubleLeft,
    HiMiniChevronDoubleRight,
    HiOutlineCog8Tooth,
    HiOutlinePlusCircle,
} from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { Auth } from '@features/Auth';
import { LanguageDropDown } from '@features/LanguageDropDown';
import { NavigationMenu } from '@features/NavigationMenu';
import { ThemeDropDown } from '@features/ThemeDropDown';
import {
    AddGroupDropDown,
    BoardDragAndDropContext,
    IBoard,
    IBoardsGroup,
    GET_BOARDS_GROUPS,
} from '@entities/Board';
import logo from '@shared/assets/images/website-logo.png';
import { createStateController } from '@shared/lib';
import { DropDownContainer, ListDropDown, NavButton, Tooltip } from '@shared/ui';
import './left-sidebar.animation.css';

export default function LeftSidebar() {
    const [currentItem, setCurrentItem] = useState<IBoard | null>(null);
    const [currentGroup, setCurrentGroup] = useState<IBoardsGroup | null>(null);

    const [isExpanded, setIsExpanded] = useState(true);
    const [isOpen, setIsOpen] = useState({
        settings: false,
        themes: false,
        languages: false,
        add: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const sidebarRef = useRef<HTMLElement>(null);
    const router = useRouter();

    const { status } = useSession();
    const client = useApolloClient();

    const { data, loading } = useQuery<{ getBoardsGroups: IBoardsGroup[] }>(GET_BOARDS_GROUPS, {
        skip: status !== 'authenticated',
    });
    const [groups, setGroups] = useState<IBoardsGroup[]>([]);

    useEffect(() => {
        if (!loading && data?.getBoardsGroups) {
            setGroups(data.getBoardsGroups);
        }
    }, [data, loading]);

    useEffect(() => {
        const handleStore = async () => {
            if (status !== 'authenticated') {
                setGroups([]);
                await client.clearStore();
            }
        };

        handleStore();
    }, [client, status]);

    const t = useTranslations('LeftSidebar');

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
                                    aria-hidden="true"
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
                    <div className="flex items-center rounded-lg hover:bg-bg-neutral transition duration-300 ease-in-out">
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
                                    <p>{t('settings')}</p>
                                </button>
                                <DropDownContainer
                                    isOpen={isOpen.settings}
                                    setIsOpen={() => setIsOpenField('settings', false)}
                                    className="left-0 bottom-full"
                                >
                                    <ListDropDown list={dropDownList} />
                                </DropDownContainer>
                                <ThemeDropDown
                                    isOpen={isOpen.themes}
                                    setIsOpen={() => setIsOpenField('themes', false)}
                                />
                                <LanguageDropDown
                                    isOpen={isOpen.languages}
                                    setIsOpen={() => setIsOpenField('languages', false)}
                                />
                            </div>
                        )}
                        <button
                            aria-label={isExpanded ? t('collapse') : t('expand')}
                            className={clsx(
                                'py-1.5 px-4 cursor-pointer text-text-primary hover:bg-bg-neutral-lighter rounded-lg',
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
