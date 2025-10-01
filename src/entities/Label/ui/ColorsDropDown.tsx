'use client';
import React from 'react';
import COLORS from '@entities/Label/consts/colors';
import { ColorButton } from '@shared/ui';

interface IColorsDropDownProps {
    onClick: (color: string) => void;
}

export default function ColorsDropDown({ onClick }: IColorsDropDownProps) {
    return (
        <ul className="flex flex-wrap justify-between gap-4 p-2 max-w-54" role="menu">
            <li className="w-full">
                <p className="font-semibold text-center">Select Color</p>
            </li>
            {COLORS.map(c => (
                <li key={c}>
                    <ColorButton color={c} onClick={() => onClick(c)} />
                </li>
            ))}
        </ul>
    );
}
