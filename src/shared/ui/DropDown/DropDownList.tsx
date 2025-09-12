'use client';
import { clsx } from 'clsx';
import React from 'react';
import ListItemSchema from '@shared/types/ListItemSchema';

interface IDropDownListProps {
    list: ListItemSchema[];
}

export default function DropDownList({ list }: IDropDownListProps) {
    return (
        <ul className="flex flex-col" role="menu">
            {list.map((l, i) => (
                <li key={i}>
                    {l.title && (
                        <p className="text-surface-lighter font-semibold py-1 px-4 border-b border-surface-light pb-2 mb-2">
                            {l.title}
                        </p>
                    )}
                    <ul
                        className={clsx(
                            i < list.length - 1 && 'border-b border-surface-light pb-2 mb-2',
                        )}
                    >
                        {l.children.map((c, i) => (
                            <li key={i}>
                                <button
                                    onClick={c.onClick}
                                    className="flex justify-between items-center cursor-pointer hover:bg-surface-light py-1 px-4 rounded-sm text-white w-full text-left"
                                    role="menuitem"
                                >
                                    {c.label}
                                </button>
                            </li>
                        ))}
                    </ul>
                </li>
            ))}
        </ul>
    );
}
