import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    onClick: () => void;
    ariaLabel?: string;
    disabled?: boolean;
}

export default function ConfirmButton({
    children,
    onClick,
    ariaLabel,
    disabled = false,
}: INavButtonProps) {
    return (
        <button
            className={clsx(
                'flex items-center justify-center gap-2 font-bold py-2 border border-surface-lighter bg-surface-light cursor-pointer rounded-lg w-full text-surface-lighter transition duration-200 ease-in-out',
                disabled ? 'hover:bg-surface-lighter text-white' : '',
            )}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
