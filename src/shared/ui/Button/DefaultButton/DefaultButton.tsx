import { clsx } from 'clsx';
import React, { ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    type?: 'button' | 'submit';
    onClick?: () => void;
    className?: string;
}

export default function DefaultButton({
    children,
    type = 'button',
    onClick,
    className,
}: INavButtonProps) {
    return (
        <button
            className={clsx(
                'font-bold flex items-center gap-1.5 p-1.5 hover:bg-bg-neutral-lighter transition duration-200 ease-in-out cursor-pointer rounded-lg max-h-9',
                className,
            )}
            onClick={onClick}
            type={type}
        >
            {children}
        </button>
    );
}
