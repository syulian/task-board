'use client';
import { clsx } from 'clsx';
import React, { ReactNode, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import './drop-down.animation.css';

interface IDropDownContainerProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: () => void;
    className?: string;
}

export default function DropDownContainer({
    children,
    isOpen,
    setIsOpen,
    className,
}: IDropDownContainerProps) {
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
                <div className="fixed z-40 inset-0" role="presentation" onClick={setIsOpen} />
                <nav
                    className={clsx(
                        'absolute z-50 bg-background-dark border border-surface-light rounded-md p-2 min-w-58 max-h-86 overflow-y-scroll',
                        className,
                    )}
                    ref={dropDownRef}
                >
                    {children}
                </nav>
            </>
        </CSSTransition>
    );
}
