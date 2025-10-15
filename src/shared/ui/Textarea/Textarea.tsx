'use client';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import React, { useEffect, useRef, useState } from 'react';
import { FieldError, FieldValues, Path, UseFormRegister } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

interface ITextareaProps<T extends FieldValues> {
    name: Path<T>;
    register: UseFormRegister<T>;
    error?: FieldError;
    placeholder?: string;
    ariaLabel: string;
}

export default function Textarea<T extends FieldValues>({
    name,
    register,
    error,
    placeholder,
    ariaLabel,
}: ITextareaProps<T>) {
    const [active, setActive] = useState(false);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (active && textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.select();
        }
    }, [active]);

    const { ref, ...rest } = register(name);
    const t = useTranslations('Main');

    const setRefs = (textarea: HTMLTextAreaElement | null) => {
        textareaRef.current = textarea;
        ref(textarea);
    };

    return (
        <div className="relative flex w-full border border-bg-neutral-lighter rounded-md bg-bg-secondary ">
            <textarea
                className={clsx(
                    'caret-bg-neutral-lighter w-full h-24 p-2 resize-none rounded-md',
                    !active && 'hidden',
                )}
                placeholder={placeholder}
                aria-label={ariaLabel}
                {...rest}
                ref={setRefs}
                onBlur={() => setActive(false)}
            />
            {!active && (
                <button
                    onFocus={() => setActive(true)}
                    className="w-full h-24 p-2 overflow-y-auto break-all text-left flex rounded-md"
                    type="button"
                    aria-label={t('textarea.change')}
                >
                    <div className={clsx(!textareaRef.current?.value && 'text-text-neutral')}>
                        <ReactMarkdown remarkPlugins={[remarkBreaks]}>
                            {textareaRef.current?.value || placeholder}
                        </ReactMarkdown>
                    </div>
                </button>
            )}
            {error && (
                <span className="absolute -bottom-6 text-sm text-red-700" aria-live="polite">
                    {error.message}
                </span>
            )}
        </div>
    );
}
