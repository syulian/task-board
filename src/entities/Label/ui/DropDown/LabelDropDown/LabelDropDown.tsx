'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import TaskLabel from '@entities/Label/model/types/TaskLabel';
import { CircleCheckbox, Label } from '@shared/ui';

interface ILabelsDropDownProps {
    labels: TaskLabel[];
    selected?: string[];
    onChange: (id: string) => void;
}

export default function LabelDropDown({ labels, selected, onChange }: ILabelsDropDownProps) {
    const t = useTranslations('Main');

    return (
        <ul className="flex flex-wrap justify-between max-w-54 bg-bg-primary" role="menu">
            <li className="p-2">
                <p className="font-semibold text-center">{t('label.change.title')}</p>
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
