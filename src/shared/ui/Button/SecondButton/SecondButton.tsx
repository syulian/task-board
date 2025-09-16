import React, { ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    onClick: () => void;
}

export default function SecondButton({ children, onClick }: INavButtonProps) {
    return (
        <button
            className="flex items-center gap-2 py-1 px-2 rounded-sm bg-surface-dark border hover:bg-surface-light transition duration-200 ease-in-out border-surface-lighter cursor-pointer"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
