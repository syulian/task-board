'use client';
import React, { ReactNode, RefObject, useEffect } from 'react';

interface IFocusTrapProps {
    children: ReactNode;
    ref: RefObject<HTMLElement | null>;
    isOpen: boolean;
}

export default function FocusTrap({ children, ref, isOpen }: IFocusTrapProps) {
    useEffect(() => {
        const el = ref.current;
        if (!isOpen || !el) return;

        const getFocusable = () => {
            return el.querySelectorAll<HTMLElement>(
                'button, [href], select, textarea, input, [tabindex]:not([tabindex="-1"])',
            );
        };

        const focusable = getFocusable();
        if (focusable.length) focusable[0].focus();

        const handleKey = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            const focusable = getFocusable();
            if (!focusable.length) return;

            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        };

        document.addEventListener('keydown', handleKey);
        return () => document.removeEventListener('keydown', handleKey);
    }, [isOpen, ref]);

    return <>{children}</>;
}
