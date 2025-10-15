import React, { ChangeEvent } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

interface IAddInputProps {
    value?: string;
    placeholder?: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    ariaLabel: string;
}

export default function AddInput({ value, placeholder, onChange, ariaLabel }: IAddInputProps) {
    return (
        <div className="flex items-center border-bg-neutral-lighter bg-bg-secondary border w-full p-2 gap-2 rounded-sm h-10.5">
            <HiOutlinePlusCircle size={24} />
            <input
                className="w-full text-sm caret-bg-neutral-lighter "
                onChange={onChange}
                placeholder={placeholder}
                aria-label={ariaLabel}
                value={value}
            />
        </div>
    );
}
