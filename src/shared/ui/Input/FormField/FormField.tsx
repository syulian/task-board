import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface IDefaultInputProps<T extends FieldValues> {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    value?: string;
}

export default function FormField<T extends FieldValues>({
    type = 'text',
    placeholder,
    label,
    name,
    register,
    error,
    value,
}: IDefaultInputProps<T>) {
    return (
        <div className="flex flex-col gap-1.5 relative">
            <label htmlFor={label}>{label}</label>
            <input
                className="w-full border border-bg-neutral-lighter bg-bg-secondary outline-none caret-bg-neutral-lighter py-1 px-2 rounded-md h-10.5"
                type={type}
                value={value}
                placeholder={placeholder}
                id={label}
                {...register(name)}
            />
            {error && (
                <span className="absolute -bottom-6 text-sm text-red-700">{error.message}</span>
            )}
        </div>
    );
}
