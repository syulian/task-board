'use client';
import React, { ChangeEvent, ReactNode } from 'react';

interface ICircleCheckboxProps {
    children?: ReactNode;
    onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
    state: boolean;
}

export default function CircleCheckbox({ children, onChange, state }: ICircleCheckboxProps) {
    return (
        <label className="flex items-center w-full gap-2 justify-between cursor-pointer hover:bg-surface-lighter/25 py-1 px-2 rounded-md">
            {children}
            <input
                className="appearance-none h-5 w-5 rounded-full border-3 border-surface-lighter
               checked:bg-surface-lighter checked:border-surface-lighter
               flex items-center justify-center cursor-pointer checked:after:content-['✓'] after:text-surface-light after:font-bold"
                type="checkbox"
                onChange={onChange}
                checked={state}
            />
        </label>
    );
}
