import { useTranslations } from 'next-intl';
import React from 'react';
import { HiMiniXMark } from 'react-icons/hi2';

interface ILabelEditProps {
    name: string;
    color: string;
    onClick: () => void;
}

export default function LabelEdit({ name, color, onClick }: ILabelEditProps) {
    const t = useTranslations('Main');

    return (
        <div
            style={{ backgroundColor: color }}
            className="flex items-center gap-2 py-1 px-2 border border-bg-secondary text-text-primary rounded-sm select-none w-fit"
        >
            {name}
            <button
                className="text-white/70 hover:text-white cursor-pointer rounded-full"
                onClick={onClick}
                type="button"
                aria-label={t('label.delete')}
            >
                <HiMiniXMark size={18} />
            </button>
        </div>
    );
}
