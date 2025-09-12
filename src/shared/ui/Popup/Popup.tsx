'use client';
import React, { Dispatch, ReactNode, SetStateAction, useRef, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { DefaultButton } from '@shared/ui';
import './popup.animation.css';
import './popup-section.animation.css';

interface IPopupProps {
    children: ReactNode;
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Popup({ isOpen, setIsOpen, children }: IPopupProps) {
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    return (
        <CSSTransition
            in={isOpen}
            nodeRef={popupRef}
            timeout={300}
            classNames="drop-down"
            unmountOnExit
            onEntered={() => setIsSectionOpen(true)}
            onExit={() => setIsSectionOpen(false)}
        >
            <>
                <div
                    className="fixed z-40 inset-0 bg-background-dark/80"
                    ref={popupRef}
                    role="presentation"
                    onClick={() => setIsOpen(false)}
                />
                <CSSTransition
                    in={isSectionOpen}
                    nodeRef={sectionRef}
                    timeout={300}
                    classNames="popup-section"
                    unmountOnExit
                >
                    <section
                        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 border border-surface-lighter bg-surface-light p-4 rounded-md"
                        ref={sectionRef}
                    >
                        <span className="flex justify-end">
                            <DefaultButton onClick={() => setIsOpen(false)}>
                                <HiMiniXMark aria-hidden="true" size={24} />
                            </DefaultButton>
                        </span>
                        {children}
                    </section>
                </CSSTransition>
            </>
        </CSSTransition>
    );
}
