'use client';
import Link from 'next/link';
import React, { useRef, useState } from 'react';
import { HiOutlinePlusSmall, HiMiniChevronDown, HiMiniChevronRight } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import './list.animation.css';

export default function NavigationMenu() {
    const [isOpen, setIsOpen] = useState(true);
    const [links, setLinks] = useState([
        {
            href: '/',
            text: '☠️ Website',
        },
    ]);

    const listRef = useRef(null);

    return (
        <section>
            <div className="flex items-center rounded-lg hover:bg-surface-light text-gray-300 font-bold transition duration-300 ease-in-out">
                <button
                    className="flex items-center gap-1.5 py-1.5 px-4 flex-grow text-left cursor-pointer"
                    onClick={() => setIsOpen(prev => !prev)}
                >
                    {isOpen ? (
                        <HiMiniChevronDown aria-hidden="true" size={24} />
                    ) : (
                        <HiMiniChevronRight aria-hidden="true" size={24} />
                    )}
                    <span>My Colors</span>
                </button>
                <button className="ml-auto py-1.5 px-4 cursor-pointer text-white">
                    <HiOutlinePlusSmall aria-hidden="true" size={24} />
                </button>
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
                            className="flex items-center gap-1.5 py-1.5 hover:bg-bunker-900 transition duration-200 ease-in-out cursor-pointer rounded-lg pl-12 pr-4 hover:bg-surface-light"
                        >
                            {link.text}
                        </Link>
                    ))}
                </div>
            </CSSTransition>
        </section>
    );
}
