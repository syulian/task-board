import React, { ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    onClick: () => void;
    ariaLabel: string;
}

export default function SecondButton({ children, onClick, ariaLabel }: INavButtonProps) {
    return (
        <button
            className="flex items-center gap-2 py-1 px-2 rounded-sm bg-bg-secondary border hover:bg-bg-neutral transition duration-200 ease-in-out border-bg-neutral-lighter cursor-pointer"
            onClick={onClick}
            type="button"
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
}
