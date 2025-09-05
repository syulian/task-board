import React from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

interface IAddInputProps {
    placeholder?: string;
    onChange: () => void;
    onSubmit: () => void;
}

export default function AddInput({ placeholder, onChange, onSubmit }: IAddInputProps) {
    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    return (
        <div className="flex items-center border-surface-lighter bg-surface-light border w-full max-w-sm p-2 gap-2 rounded-sm">
            <HiOutlinePlusCircle size={24} />
            <input
                className="w-full outline-none text-sm caret-surface-lighter h-6"
                type="search"
                onChange={onChange}
                onKeyDown={handleOnKeyDown}
                aria-label="Search"
                placeholder={placeholder}
            />
        </div>
    );
}
