import React from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { DefaultButton } from '@shared/ui';

interface ILabelEditProps {
    name: string;
    color: string;
    onClick: () => void;
}

export default function LabelEdit({ name, color, onClick }: ILabelEditProps) {
    return (
        <div
            style={{ backgroundColor: color }}
            className="flex items-center gap-2 py-1 px-2 border border-surface-dark rounded-sm select-none"
        >
            {name}
            <DefaultButton onClick={onClick}>
                <HiMiniXMark size={18} />
            </DefaultButton>
        </div>
    );
}
