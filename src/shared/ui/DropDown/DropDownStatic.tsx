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

export default function DropDownStatic({
    children,
    isOpen,
    setIsOpen,
    className,
}: IDropDownContainerProps) {
    const dropDownRef = useRef<HTMLDivElement>(null);

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
                <div
                    className={clsx(
                        'absolute z-50 bg-bg-primary border border-bg-neutral rounded-md p-2 min-w-58  overflow-y-scroll',
                        className,
                    )}
                    ref={dropDownRef}
                >
                    {children}
                </div>
            </>
        </CSSTransition>
    );
}
