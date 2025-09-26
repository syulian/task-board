import { clsx } from 'clsx';
import React, { MouseEvent, ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    ariaLabel?: string;
    disabled?: boolean;
    type?: 'button' | 'submit';
}

export default function ConfirmButton({
    children,
    onClick,
    ariaLabel,
    disabled = false,
    type = 'button',
}: INavButtonProps) {
    return (
        <button
            className={clsx(
                'flex items-center justify-center gap-2 font-bold py-2 border border-surface-lighter bg-surface-light cursor-pointer rounded-lg w-full text-surface-lighter transition duration-200 ease-in-out',
                !disabled ? 'hover:bg-surface-lighter text-white' : '',
            )}
            onClick={onClick}
            aria-label={ariaLabel}
            disabled={disabled}
            type={type}
        >
            {children}
        </button>
    );
}
