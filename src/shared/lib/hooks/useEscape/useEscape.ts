'use client';
import { useEffect } from 'react';

const useEscape = (isOpen: boolean, onDismiss: () => void) => {
    useEffect(() => {
        if (!isOpen) return;
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onDismiss();
        };

        window.addEventListener('keydown', handleKey);
        return () => window.removeEventListener('keydown', handleKey);
    }, [isOpen]);
};

export default useEscape;
