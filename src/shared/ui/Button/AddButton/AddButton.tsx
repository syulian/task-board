import React from 'react';
import { HiMiniPlus } from 'react-icons/hi2';

interface INavButtonProps {
    onClick: () => void;
}

export default function AddButton({ onClick }: INavButtonProps) {
    return (
        <button
            className="absolute bottom-4 right-0 shadow-[-3px_3px_4px_0px_rgba(0,_0,_0,_0.2)] py-1 px-2 bg-surface-light/80 rounded-l-md cursor-pointer hover:bg-surface-light transition duration-200 ease-in-out border-surface-dark border-l border-y"
            onClick={onClick}
        >
            <HiMiniPlus size={24} />
        </button>
    );
}
