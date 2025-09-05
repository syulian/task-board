import React, { ReactNode } from 'react';

interface INavButtonProps {
    children: ReactNode;
    onClick: () => void;
}

export default function NavButton({ children, onClick }: INavButtonProps) {
    return (
        <button
            className="font-bold flex items-end gap-1.5 py-1.5 px-4 hover:bg-surface-light transition duration-200 ease-in-out cursor-pointer rounded-lg w-full truncate"
            onClick={onClick}
        >
            {children}
        </button>
    );
}
