import { ChangeEvent, ReactNode } from 'react';
import React from 'react';

interface ICheckboxProps {
    children?: ReactNode;
    onChange?: (event?: ChangeEvent<HTMLInputElement>) => void;
    state: boolean;
}

export default function Checkbox({ children, onChange, state }: ICheckboxProps) {
    return (
        <label className="flex items-center gap-2 ">
            <input
                className="accent-surface-lighter"
                type="checkbox"
                onChange={onChange}
                checked={state}
            />
            {children}
        </label>
    );
}
