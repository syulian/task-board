import React from 'react';
import { HiMagnifyingGlass } from 'react-icons/hi2';

interface ISearchInputProps {
    placeholder?: string;
    onChange: () => void;
}

export default function SearchInput({ placeholder, onChange }: ISearchInputProps) {
    return (
        <div className="flex items-center border-surface-light border border-solid w-full max-w-md p-2 gap-2 rounded-sm">
            <HiMagnifyingGlass size={24} />
            <input
                className="w-full outline-none text-sm caret-surface-light h-6"
                type="search"
                onChange={onChange}
                aria-label="Search"
                placeholder={placeholder}
            />
        </div>
    );
}
