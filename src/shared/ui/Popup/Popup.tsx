'use client';
import { useTranslations } from 'next-intl';
import React, { ReactNode, useRef, useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import useEscape from '@shared/lib/hooks/useEscape/useEscape';
import DefaultButton from '@shared/ui/Button/DefaultButton/DefaultButton';
import FocusTrap from '@shared/ui/FocusTrap/FocusTrap';
import './popup.animation.css';
import './popup-section.animation.css';

interface IPopupProps {
    isOpen: boolean;
    setIsOpen: () => void;
    children: ReactNode;
    storyMode?: boolean;
}

export default function Popup({ isOpen, setIsOpen, children, storyMode = true }: IPopupProps) {
    const [isSectionOpen, setIsSectionOpen] = useState(false);

    const popupRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);

    const t = useTranslations('Main');
    useEscape(isOpen, setIsOpen);

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
                    className="fixed z-40 inset-0 bg-bg-primary/80"
                    ref={popupRef}
                    role="presentation"
                    onClick={setIsOpen}
                />
                <CSSTransition
                    in={isSectionOpen}
                    nodeRef={sectionRef}
                    timeout={300}
                    classNames="popup-section"
                    unmountOnExit={storyMode}
                >
                    <section
                        className="fixed z-50 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col gap-2 border border-bg-neutral-lighter bg-bg-neutral p-4 rounded-md"
                        ref={sectionRef}
                        role="dialog"
                        aria-modal="true"
                    >
                        <span className="flex justify-end">
                            <DefaultButton onClick={setIsOpen} ariaLabel={t('popup.close')}>
                                <HiMiniXMark size={24} />
                            </DefaultButton>
                        </span>
                        <FocusTrap ref={sectionRef} isOpen={isOpen}>
                            {children}
                        </FocusTrap>
                    </section>
                </CSSTransition>
            </>
        </CSSTransition>
    );
}
