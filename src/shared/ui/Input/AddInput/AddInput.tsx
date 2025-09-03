import React, { useEffect, useRef } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

interface IAddInputProps {
    placeholder?: string;
    onChange: () => void;
    onSubmit: () => void;
}

export default function AddInput({ placeholder, onChange, onSubmit }: IAddInputProps) {
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        const input = inputRef.current;
        if (!input) return;

        input.addEventListener('focusin', onSubmit);
        return () => input.removeEventListener('focusin', onSubmit);
    }, [onSubmit]);

    return (
        <div className="flex items-center border-surface-lighter bg-surface-light border w-full max-w-sm p-2 gap-2 rounded-sm">
            <HiOutlinePlusCircle size={24} />
            <input
                className="w-full outline-none text-sm caret-surface-lighter h-6"
                type="search"
                onChange={onChange}
                aria-label="Search"
                placeholder={placeholder}
                ref={inputRef}
            />
        </div>
    );
}
