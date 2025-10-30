import { ChangeEvent, ReactNode, useId } from 'react';
import React from 'react';

interface ICheckboxProps {
    children?: ReactNode;
    onChange: (event?: ChangeEvent<HTMLInputElement>) => void;
    state: boolean;
}

export default function CheckboxDefault({ children, onChange, state }: ICheckboxProps) {
    const id = useId();

    return (
        <div className="flex items-center gap-2">
            <input
                className="accent-bg-neutral-lighter cursor-pointer"
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
            <label className="cursor-pointer" htmlFor={id}>
                {children}
            </label>
        </div>
    );
}
