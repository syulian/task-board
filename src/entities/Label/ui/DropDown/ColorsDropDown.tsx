'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import COLORS from '@entities/Label/consts/colors';
import { ColorButton } from '@shared/ui';

interface IColorsDropDownProps {
    onClick: (color: string) => void;
}

export default function ColorsDropDown({ onClick }: IColorsDropDownProps) {
    const t = useTranslations('Main');

    return (
        <ul className="flex flex-wrap justify-between gap-4 p-2 max-w-54" role="menu">
            <li className="w-full">
                <p className="font-semibold text-center">Select Color</p>
            </li>
            {COLORS.map(c => (
                <li key={c}>
                    <ColorButton
                        color={c}
                        onClick={() => onClick(c)}
                        ariaLabel={t('label.color-name', { color: c.slice(1, c.length) })}
                    />
                </li>
            ))}
        </ul>
    );
}
