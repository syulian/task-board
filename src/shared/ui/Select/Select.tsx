'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { HiMiniChevronDown } from 'react-icons/hi2';
import SelectItemSchema from '@shared/types/SelectItemSchema';

interface ISelectProps {
    list: SelectItemSchema[];
    selected: SelectItemSchema;
    setSelected: Dispatch<SetStateAction<SelectItemSchema>>;
}

export default function Select({ list, selected, setSelected }: ISelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative min-w-56">
            <button
                className="flex items-center justify-between gap-2 bg-surface-dark border border-surface-lighter px-4 py-1 rounded-sm cursor-pointer w-full"
                onClick={() => setIsOpen(prev => !prev)}
            >
                {selected.label}
                <HiMiniChevronDown size={24} />
            </button>
            {isOpen && (
                <ul className="absolute bg-surface-dark w-full rounded-b-sm">
                    {list.map(l => (
                        <li key={l.id}>
                            <button
                                className="cursor-pointer hover:bg-surface-light py-1 px-4 rounded-sm text-white w-full text-left truncate"
                                onClick={() => {
                                    setIsOpen(false);
                                    setSelected(l);
                                }}
                            >
                                {l.label}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
