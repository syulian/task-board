'use client';
import React from 'react';
import { ILabel } from '@entities/Label';
import { CircleCheckbox, Label } from '@shared/ui';

interface ILabelsDropDownProps {
    labels: ILabel[];
    selected?: string[];
    onChange: (id: string) => void;
}

export default function LabelDropDown({ labels, selected, onChange }: ILabelsDropDownProps) {
    return (
        <ul className="flex flex-wrap justify-between max-w-54" role="menu">
            <li className="p-2">
                <p className="font-semibold text-center">Select Labels</p>
            </li>
            {labels.map((l, i) => (
                <li key={i} className="w-full">
                    <CircleCheckbox
                        state={!!selected?.some(s => s === l.id)}
                        onChange={() => onChange(l.id)}
                    >
                        <Label color={l.color} name={l.name} />
                    </CircleCheckbox>
                </li>
            ))}
        </ul>
    );
}
