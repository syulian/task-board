'use client';
import React, { ChangeEvent } from 'react';

interface ITextareaProps {
    value?: string;
    onChange: (event: ChangeEvent) => void;
}

export default function Textarea({ value, onChange }: ITextareaProps) {
    return (
        <textarea
            className="relative flex w-full border border-bg-neutral-lighter"
            value={value}
            onChange={onChange}
        />
    );
}
