import { clsx } from 'clsx';
import React, { MouseEvent, ReactNode } from 'react';

interface IConfirmButtonProps {
    children: ReactNode;
    onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
    ariaLabel: string;
    type?: 'button' | 'submit';
    error?: string;
}

export default function ConfirmButton({
    children,
    onClick,
    ariaLabel,
    type = 'button',
    error,
}: IConfirmButtonProps) {
    return (
        <div className="relative">
            <button
                className={clsx(
                    'flex items-center justify-center gap-2 font-bold py-2 border border-bg-neutral-lighter bg-bg-neutral cursor-pointer rounded-sm w-full text-white transition duration-200 ease-in-out hover:bg-bg-primary',
                )}
                onClick={onClick}
                aria-label={ariaLabel}
                type={type}
            >
                {children}
            </button>
            <span className="absolute -bottom-6 text-sm text-red-700" aria-live="polite">
                {error}
            </span>
        </div>
    );
}
