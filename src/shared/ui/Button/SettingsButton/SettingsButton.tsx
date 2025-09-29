import React, { ReactNode } from 'react';
import { HiEllipsisHorizontal } from 'react-icons/hi2';

interface ISettingsButtonProps {
    children?: ReactNode;
    onClick: () => void;
}

export default function SettingsButton({ children, onClick }: ISettingsButtonProps) {
    return (
        <button
            className="py-2 px-4 z gap-4 flex items-center whitespace-nowrap bg-bg-neutral cursor-pointer rounded-sm font-semibold"
            onClick={onClick}
        >
            {children}
            <HiEllipsisHorizontal size={24} />
        </button>
    );
}
