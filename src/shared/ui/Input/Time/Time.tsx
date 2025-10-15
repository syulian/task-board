import { useTranslations } from 'next-intl';
import React, { ChangeEvent, Dispatch, SetStateAction } from 'react';

interface ITimeProps {
    minutes: number;
    hours: number;
    setMinutes: Dispatch<SetStateAction<number>>;
    setHours: Dispatch<SetStateAction<number>>;
}

export default function Time({ minutes, hours, setMinutes, setHours }: ITimeProps) {
    const handleHoursInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        if (isNaN(value)) return;

        if (+value > 23) return setHours(23);
        if (+value < 0) return setHours(0);
        setHours(value);
    };

    const handleMinutesInput = (event: ChangeEvent<HTMLInputElement>) => {
        const value = +event.target.value;
        if (isNaN(value)) return;

        if (+value > 59) return setMinutes(59);
        if (+value < 0) return setMinutes(0);
        setMinutes(value);
    };

    const t = useTranslations('Main');

    return (
        <span className="flex justify-between items-center border border-bg-neutral-lighter rounded-md bg-bg-secondary w-20">
            <input
                className="w-8 text-center appearance-none caret-bg-neutral-lighter"
                type="text"
                onChange={handleHoursInput}
                maxLength={2}
                value={hours}
                aria-label={t('task.calendar.hours')}
            />
            :
            <input
                className="w-8 text-center appearance-none caret-bg-neutral-lighter"
                type="text"
                onChange={handleMinutesInput}
                maxLength={2}
                value={minutes}
                aria-label={t('task.calendar.minutes')}
            />
        </span>
    );
}
