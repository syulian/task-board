'use client';
import { useTranslations } from 'next-intl';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { HiMiniChevronDown, HiMiniChevronUp } from 'react-icons/hi2';
import useEscape from '@shared/lib/hooks/useEscape/useEscape';
import SelectItemSchema from '@shared/types/SelectItemSchema';

interface ISelectProps {
    list: SelectItemSchema[];
    selected: SelectItemSchema;
    setSelected: Dispatch<SetStateAction<SelectItemSchema>>;
    ariaLabel: string;
}

export default function Select({ list, selected, setSelected, ariaLabel }: ISelectProps) {
    const [isOpen, setIsOpen] = useState(false);

    useEscape(isOpen, () => setIsOpen(false));
    const t = useTranslations('Main');

    return (
        <div className="flex relative min-w-0 z-40">
            <button
                className="flex items-center justify-between gap-2 bg-bg-secondary border border-bg-neutral-lighter px-4 py-1 rounded-sm cursor-pointer w-full truncate"
                onClick={() => setIsOpen(prev => !prev)}
                type="button"
                aria-label={t(isOpen ? 'select.close' : 'select.open')}
            >
                <span className="truncate overflow-hidden">{selected.label}</span>
                {isOpen ? (
                    <HiMiniChevronUp className="min-h-6 min-w-6" />
                ) : (
                    <HiMiniChevronDown className="min-h-6 min-w-6" />
                )}
            </button>
            {isOpen && (
                <ul
                    className="absolute top-full bg-bg-secondary w-full rounded-b-sm overflow-y-auto max-h-54"
                    role="listbox"
                >
                    {list.map(l => (
                        <li key={l.id}>
                            <button
                                className="cursor-pointer hover:bg-bg-neutral py-1 px-4 rounded-sm w-full text-left truncate"
                                onClick={() => {
                                    setIsOpen(false);
                                    setSelected(l);
                                }}
                                aria-label={ariaLabel}
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
