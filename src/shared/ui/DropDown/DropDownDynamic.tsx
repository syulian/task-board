'use client';
import { clsx } from 'clsx';
import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { StopPropagation } from '@shared/ui';
import './drop-down.animation.css';

interface IDropDownContainerProps {
    coordinates: {
        x: number;
        y: number;
    };
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: () => void;
}

export default function DropDownDynamic({
    coordinates,
    children,
    isOpen,
    setIsOpen,
}: IDropDownContainerProps) {
    const [position, setPosition] = useState<{
        left: number;
        top: number;
    } | null>(null);
    const dropDownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const dropDown = dropDownRef.current;
        if (!dropDown || !isOpen) return;

        const rect = dropDown.getBoundingClientRect();

        const { innerWidth, innerHeight } = window;
        const { x, y } = coordinates;

        const left = x + rect.width > innerWidth ? innerWidth - rect.width - 8 : x;
        const top = y + rect.height > innerHeight ? innerHeight - rect.height - 8 : y;

        setPosition({ left, top });
    }, [coordinates, isOpen]);

    return (
        <CSSTransition
            in={isOpen}
            nodeRef={dropDownRef}
            timeout={300}
            classNames="drop-down"
            unmountOnExit
        >
            <>
                {createPortal(
                    <StopPropagation>
                        <div
                            className="fixed z-40 inset-0"
                            role="presentation"
                            onClick={setIsOpen}
                        />
                        <div
                            className={clsx(
                                'absolute z-50 bg-bg-primary border border-bg-neutral rounded-md p-2 min-w-58  overflow-y-scroll',
                            )}
                            ref={dropDownRef}
                            style={{ left: position?.left + 'px', top: position?.top + 'px' }}
                        >
                            {children}
                        </div>
                    </StopPropagation>,
                    document.body,
                )}
            </>
        </CSSTransition>
    );
}
