'use client';
import React, { Dispatch, SetStateAction, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './drop-down.animation.css';

interface IDropDownProps {
    list: {
        label: string;
        onClick: () => void;
    }[];
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function DropDown({ list, isOpen, setIsOpen }: IDropDownProps) {
    const dropDownRef = useRef<HTMLElement>(null);

    return (
        <CSSTransition
            in={isOpen}
            nodeRef={dropDownRef}
            timeout={300}
            classNames="drop-down"
            unmountOnExit
        >
            <>
                <button
                    className="w-screen h-screen fixed left-0 top-0"
                    onClick={() => setIsOpen(false)}
                />
                <nav
                    className="absolute z-50 bg-background-dark border border-surface-light rounded-md p-2 right-0 min-w-48"
                    ref={dropDownRef}
                >
                    <ul className="flex flex-col" role="menu">
                        {list.map((l, i) => (
                            <li key={i}>
                                <button
                                    onClick={l.onClick}
                                    className="cursor-pointer hover:bg-surface-dark py-1 px-2 text-sm text-white w-full text-left"
                                    role="menuitem"
                                >
                                    {l.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </>
        </CSSTransition>
    );
}
