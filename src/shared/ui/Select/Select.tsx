'use client';
import React, { Dispatch, SetStateAction } from 'react';
import { HiMiniChevronDown } from 'react-icons/hi2';
import ListItemSchema from '@shared/types/ListItemSchema';
import { DropDownContainer, DropDownList } from '@shared/ui';

interface ISelectProps {
    isOpen: boolean;
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    list: ListItemSchema[];
    selected: string;
}

export default function Select({ isOpen, setIsOpen, list, selected }: ISelectProps) {
    return (
        <div className="relative">
            <button
                className="flex items-center gap-2 bg-surface-dark border border-surface-lighter px-4 py-1 rounded-sm cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {selected}
                <HiMiniChevronDown size={24} />
            </button>
            <DropDownContainer
                isOpen={isOpen}
                setIsOpen={() => setIsOpen(false)}
                className="right-0 top-full"
            >
                <DropDownList list={list} />
            </DropDownContainer>
        </div>
    );
}
