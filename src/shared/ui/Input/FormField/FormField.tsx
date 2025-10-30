import React from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface IDefaultInputProps<T extends FieldValues> {
    type?: 'text' | 'password' | 'email';
    placeholder?: string;
    label: string;
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
}

export default function FormField<T extends FieldValues>({
    type = 'text',
    placeholder,
    label,
    name,
    register,
    error,
}: IDefaultInputProps<T>) {
    return (
        <div className="flex flex-col gap-1.5 relative">
            <label htmlFor={name}>{label}</label>
            <input
                className="w-full border border-bg-neutral-lighter bg-bg-secondary caret-bg-neutral-lighter py-1 px-2 rounded-md h-10.5"
                type={type}
                placeholder={placeholder}
                id={name}
                aria-invalid={!!error}
                onKeyDown={e => {
                    if (e.key === 'Enter') e.preventDefault();
                }}
                {...register(name)}
            />
            {error && (
                <span
                    className="absolute -bottom-6 text-sm text-red-700 truncate w-full"
                    aria-live="polite"
                >
                    {error.message}
                </span>
            )}
        </div>
    );
}
