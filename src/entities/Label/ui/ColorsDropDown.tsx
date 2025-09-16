'use client';
import React from 'react';
import { ColorButton } from '@shared/ui';

interface IColorsDropDownProps {
    list?: {
        color: string;
        onClick: () => void;
    }[];
}

const colorList = [
    {
        color: '#d62828',
        onClick: () => {},
    },
    {
        color: '#f77f00',
        onClick: () => {},
    },
    {
        color: '#fcbf49',
        onClick: () => {},
    },
    {
        color: '#6a994e',
        onClick: () => {},
    },
    {
        color: '#386641',
        onClick: () => {},
    },
    {
        color: '#1d3557',
        onClick: () => {},
    },
    {
        color: '#457b9d',
        onClick: () => {},
    },
    {
        color: '#118ab2',
        onClick: () => {},
    },
    {
        color: '#7209b7',
        onClick: () => {},
    },
    {
        color: '#b5179e',
        onClick: () => {},
    },
    {
        color: '#ff006e',
        onClick: () => {},
    },
    {
        color: '#6c757d',
        onClick: () => {},
    },
];

export default function ColorsDropDown({ list }: IColorsDropDownProps) {
    return (
        <ul className="flex flex-wrap justify-between gap-4 p-2 max-w-54" role="menu">
            <li className="w-full">
                <p className="font-semibold text-center">Select Color</p>
            </li>
            {colorList.map(c => (
                <li key={c.color}>
                    <ColorButton color={c.color} onClick={c.onClick} />
                </li>
            ))}
        </ul>
    );
}
