import React, { ChangeEvent } from 'react';

interface IDefaultInputProps {
    type?: 'text' | 'password';
    placeholder?: string;
    label: string;
    value?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onSubmit?: () => void;
}

export default function DefaultInput({
    type = 'text',
    placeholder,
    label,
    value,
    onChange,
}: IDefaultInputProps) {
    return (
        <div className="flex flex-col gap-1.5">
            <label htmlFor={label}>{label}</label>
            <input
                className="w-full border border-bg-neutral-lighter bg-bg-secondary outline-none caret-bg-neutral-lighter py-1 px-2 rounded-md h-10.5"
                type={type}
                onChange={onChange}
                value={value}
                placeholder={placeholder}
                id={label}
            />
        </div>
    );
}
