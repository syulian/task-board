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
} from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { NavigationMenu } from '@features/NavigationMenu';
import { NavButton } from '@shared/ui';
import './left-sidebar.animation.css';

export default function LeftSidebar() {
    const [isExpanded, setIsExpanded] = useState(true);
    const sidebarRef = useRef<HTMLElement>(null);

    return (
        <CSSTransition in={isExpanded} nodeRef={sidebarRef} timeout={300} classNames="left-sidebar">
            <aside
                className="flex flex-col max-w-85 w-full bg-surface-dark h-screen border-surface-light border-r "
                ref={sidebarRef}
            >
                <div className="flex flex-col gap-2 p-4 overflow-y-scroll overflow-hidden">
                    <NavButton onClick={() => {}}>
                        <Image
                            alt="logo"
                            src="/icons/apple-touch-icon.png"
                            width={24}
                            height={24}
                        />
                        {isExpanded && <p>Task Board</p>}
                    </NavButton>
                    <NavButton onClick={() => {}}>
                        <HiOutlineUserCircle aria-hidden="true" className="min-w-6 min-h-6" />
                        {isExpanded && <p>tony_redgrave</p>}
                    </NavButton>
                    <NavButton onClick={() => {}}>
                        <HiOutlineCloud aria-hidden="true" className="min-w-6 min-h-6" />
                        {isExpanded && <p>Synced</p>}
                    </NavButton>
                    <NavigationMenu isExpanded={isExpanded} />
                </div>
                <div className="flex flex-col gap-2 mt-auto p-4 border-t border-surface-light sticky bottom-0 bg-surface-dark">
                    <NavButton onClick={() => {}}>
                        <HiOutlinePlusCircle aria-hidden="true" className="min-w-6 min-h-6" />
                        {isExpanded && <p>Add Group</p>}
                    </NavButton>
                    <div className="flex items-center rounded-lg hover:bg-surface-light font-bold transition duration-300 ease-in-out">
                        {isExpanded && (
                            <button
                                className="flex items-center gap-1.5 py-1.5 px-4 flex-grow text-left cursor-pointer"
                                onClick={() => {}}
                            >
                                <HiOutlineCog8Tooth aria-hidden="true" size={24} />
                                <p>Settings</p>
                            </button>
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
