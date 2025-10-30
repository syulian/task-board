import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { getDate } from '@shared/lib';

interface ILabelProps {
    complete?: boolean;
    dueDate?: Date;
}

export default function LabelComplete({ complete, dueDate }: ILabelProps) {
    const t = useTranslations('Main');

    return (
        <p
            className={clsx(
                'absolute top-0 right-4 py-1 px-2 bg-bg-primary rounded-b-sm font-semibold text-sm border-b border-l border-r border-bg-secondary opacity-80 select-none',
                complete
                    ? 'bg-green-800 text-text-secondary'
                    : dueDate &&
                          (new Date(dueDate) >= new Date() ? 'text-blue-400' : 'text-red-400'),
            )}
        >
            {complete ? 'Complete' : dueDate && getDate(dueDate, t)}
        </p>
    );
}
