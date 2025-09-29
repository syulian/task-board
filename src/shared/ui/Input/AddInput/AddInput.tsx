import React, { ChangeEvent, useState } from 'react';
import { HiOutlinePlusCircle } from 'react-icons/hi2';

interface IAddInputProps {
    value?: string;
    placeholder?: string;
    onSubmit: () => void;
}

export default function AddInput({ value, placeholder, onSubmit }: IAddInputProps) {
    const [newValue, setNewValue] = useState(value);

    const handleOnKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            onSubmit();
        }
    };

    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewValue(event.target.value);
    };

    return (
        <div className="flex items-center border-bg-neutral-lighter bg-bg-secondary border w-full p-2 gap-2 rounded-sm h-10.5">
            <HiOutlinePlusCircle size={24} />
            <input
                className="w-full outline-none text-sm caret-bg-neutral-lighter "
                type="search"
                onChange={onChange}
                onKeyDown={handleOnKeyDown}
                placeholder={placeholder}
                value={newValue}
            />
        </div>
    );
}
