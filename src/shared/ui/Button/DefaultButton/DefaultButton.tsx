import React, { ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    onClick: () => void;
}

export default function DefaultButton({ children, onClick }: INavButtonProps) {
    return (
        <button
            className="font-bold flex items-center gap-1.5 p-1.5 hover:bg-surface-light transition duration-200 ease-in-out cursor-pointer rounded-lg max-h-9"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
