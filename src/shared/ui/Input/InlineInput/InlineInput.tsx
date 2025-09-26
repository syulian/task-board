import React, { useEffect, useRef, useState } from 'react';

interface IInlineInputProps {
    value?: string;
    disabled?: boolean;
    onBlur: (value: string) => Promise<void>;
}

export default function InlineInput({ value, onBlur, disabled = true }: IInlineInputProps) {
    const [input, setInput] = useState(value || '');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!disabled && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [disabled]);

    return (
        <input
            className="w-full pr-4 truncate h-6 cursor-pointer"
            type="text"
            value={input}
            disabled={disabled}
            ref={inputRef}
            onChange={event => setInput(event.target.value)}
            onBlur={async () => {
                await onBlur(input);
            }}
        />
    );
}
