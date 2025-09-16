'use client';
import React from 'react';
import { CircleCheckbox, Label } from '@shared/ui';

interface ILabelsDropDownProps {
    list?: {
        color: string;
        onClick: () => void;
    }[];
}

const labels = [
    {
        name: 'Important',
        color: '#bd2424',
    },
    {
        name: 'Nice',
        color: '#3ea9bc',
    },
];

export default function LabelsDropDown({ list }: ILabelsDropDownProps) {
    return (
        <ul className="flex flex-wrap justify-between max-w-54" role="menu">
            <li className="p-2">
                <p className="font-semibold text-center">Select Labels</p>
            </li>
            {labels.map((l, i) => (
                <li key={i} className="w-full">
                    <CircleCheckbox state={true} onChange={() => {}}>
                        <Label color={l.color} name={l.name} />
                    </CircleCheckbox>
                </li>
            ))}
        </ul>
    );
}
