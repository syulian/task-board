'use client';
import React, { ChangeEvent, ReactNode, useId } from 'react';

interface ICircleCheckboxProps {
    children?: ReactNode;
    onChange: (event?: ChangeEvent<HTMLInputElement>) => void;
    state: boolean;
}

export default function CircleCheckbox({ children, onChange, state }: ICircleCheckboxProps) {
    const id = useId();

    return (
        <div className="flex items-center w-full gap-2 justify-between cursor-pointer hover:bg-bg-neutral-lighter/25 py-1 px-2 rounded-md">
            <label className="cursor-pointer" htmlFor={id}>
                {children}
            </label>
            <input
                className="appearance-none h-5 w-5 rounded-full border-2 border-bg-neutral-lighter
               checked:bg-bg-neutral-lighter checked:border-bg-neutral-lighter
               flex items-center justify-center cursor-pointer checked:after:content-['✓'] after:text-bg-neutral after:font-bold"
                type="checkbox"
                onChange={onChange}
                checked={state}
                onKeyDown={e => {
                    if (e.key === 'Enter') {
                        e.preventDefault();
                        onChange();
                    }
                }}
                id={id}
            />
        </div>
    );
}
