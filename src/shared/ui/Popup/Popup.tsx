'use client';
import React, { ReactNode, useRef, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import DefaultButton from '@shared/ui/Button/DefaultButton/DefaultButton';
import './popup.animation.css';
import './popup-section.animation.css';

interface IPopupProps {
    isOpen: boolean;
    setIsOpen: () => void;
    children: ReactNode;
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
                    onClick={setIsOpen}
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
                            <DefaultButton onClick={setIsOpen}>
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
