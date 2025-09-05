'use client';
import { clsx } from 'clsx';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { HiOutlinePlusSmall, HiMiniChevronDown, HiMiniChevronRight } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import './list.animation.css';

interface INavigationMenuProps {
    isExpanded: boolean;
}

export default function NavigationMenu({ isExpanded }: INavigationMenuProps) {
    const [isOpen, setIsOpen] = useState(true);
    const [links, setLinks] = useState([
        {
            href: '/',
            text: '💀 Website',
        },
    ]);

    const listRef = useRef(null);

    return (
        <section>
            <div className="flex items-center rounded-lg hover:bg-surface-light text-gray-300 font-bold transition duration-300 ease-in-out relative">
                <button
                    className="flex items-center gap-1.5 py-1.5 px-4 flex-grow text-left cursor-pointer truncate"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ? (
                        <HiMiniChevronDown aria-hidden="true" className="min-w-6 min-h-6" />
                    ) : (
                        <HiMiniChevronRight aria-hidden="true" className="min-w-6 min-h-6" />
                    )}
                    {isExpanded && <p>My Boards</p>}
                </button>
                {isExpanded && (
                    <button className="ml-auto py-1.5 px-4 cursor-pointer text-white hover:bg-surface-lighter rounded-lg absolute left-[251px]">
                        <HiOutlinePlusSmall aria-hidden="true" size={24} />
                    </button>
                )}
            </div>
            <CSSTransition
                in={isOpen}
                nodeRef={listRef}
                timeout={300}
                classNames="list"
                unmountOnExit
            >
                <div className="flex flex-col overflow-y-scroll max-h-125" ref={listRef}>
                    {links.map((link, index) => (
                        <Link
                            key={index}
                            href={link.href}
                            className={clsx(
                                'gap-1.5 py-1.5 hover:bg-bunker-900 transition duration-200 ease-in-out cursor-pointer rounded-lg pr-4 hover:bg-surface-light truncate',
                                isExpanded ? 'pl-12' : 'pl-4',
                            )}
                        >
                            {isExpanded ? (
                                link.text
                            ) : (
                                <p className="w-6 text-center bg-surface-light rounded-full">
                                    {Array.from(link.text)[0] ?? '?'}
                                </p>
                            )}
                        </Link>
                    ))}
                </div>
            </CSSTransition>
        </section>
    );
}
