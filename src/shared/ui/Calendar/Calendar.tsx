'use client';
import { clsx } from 'clsx';
import React, { useEffect, useState } from 'react';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';
import { Select } from '@shared/ui';
import DefaultButton from '@shared/ui/Button/DefaultButton/DefaultButton';
import Time from '@shared/ui/Input/Time/Time';

interface ICalendarProps {
    date?: string;
}

const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];

const weekNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const months = monthNames.map((m, i) => ({ id: i.toString(), label: m }));

const years = Array.from({ length: 100 }, (_, i) => {
    const year = (2000 + i).toString();
    return { id: year, label: year };
});

export default function Calendar({ date }: ICalendarProps) {
    const [currentDate, setCurrentDate] = useState<Date | null>(null);

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const [selectedMonth, setSelectedMonth] = useState({
        id: '7',
        label: 'August',
    });

    const [selectedYear, setSelectedYear] = useState({
        id: '2025',
        label: '2025',
    });

    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    useEffect(() => {
        if (typeof selectedDay !== 'number') return;
        const year = Number(selectedYear.id);
        const month = Number(selectedMonth.id);

        console.log(year, month, selectedDay, hours, minutes);

        setCurrentDate(new Date(year, month, selectedDay, hours, minutes));
    }, [selectedYear, selectedMonth, selectedDay, hours, minutes]);

    const getMonthDays = () => {
        const year = Number(selectedYear.id);
        const month = Number(selectedMonth.id);

        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        return { firstDay, daysInMonth };
    };

    const { firstDay, daysInMonth } = getMonthDays();

    const isToday = (day: number, year: number, month: number, date: Date) => {
        return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
    };

    const changeMonth = (direction: -1 | 1) => {
        setSelectedMonth(prev => {
            let month = Number(prev.id) + direction;
            let year = Number(selectedYear.id);

            if (month < 0) {
                month = 11;
                year -= 1;
            } else if (month > 11) {
                month = 0;
                year += 1;
            }

            setSelectedYear({ id: year.toString(), label: year.toString() });

            return {
                id: month.toString(),
                label: months[month].label,
            };
        });
    };

    return (
        <div className="flex flex-col items-center gap-4 w-sm bg-surface-dark py-4 px-8 rounded-sm border border-surface-lighter">
            <p className="font-semibold text-center">Set Due Date</p>
            <div className="flex justify-between items-center gap-2 w-80.5">
                <DefaultButton onClick={() => changeMonth(-1)}>
                    <HiMiniChevronLeft size={24} />
                </DefaultButton>
                <div className="min-w-0 flex-1">
                    <Select selected={selectedMonth} setSelected={setSelectedMonth} list={months} />
                </div>
                <div className="min-w-0 flex-1">
                    <Select selected={selectedYear} setSelected={setSelectedYear} list={years} />
                </div>
                <DefaultButton onClick={() => changeMonth(1)}>
                    <HiMiniChevronRight size={24} />
                </DefaultButton>
            </div>
            <div className="flex flex-wrap text-center w-80.5">
                {weekNames.map(w => (
                    <div key={w} className="flex items-center justify-center w-11.5 font-bold">
                        {w}
                    </div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={i} className="w-11.5 h-11.5" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => (
                    <button
                        key={i}
                        className={clsx(
                            'flex items-center justify-center w-11.5 h-11.5 p-4 rounded-sm cursor-pointer',
                            isToday(
                                i,
                                Number(selectedYear.id),
                                Number(selectedMonth.id),
                                new Date(),
                            ) && 'border border-surface-lighter',
                            currentDate &&
                                isToday(
                                    i,
                                    Number(selectedYear.id),
                                    Number(selectedMonth.id),
                                    currentDate,
                                ) &&
                                'bg-surface-lighter/50',
                        )}
                        onClick={() =>
                            setSelectedDay(prev => {
                                if (prev && prev === i) {
                                    setCurrentDate(null);
                                    return null;
                                }

                                return i;
                            })
                        }
                    >
                        {i + 1}
                    </button>
                ))}
            </div>
            <Time minutes={minutes} hours={hours} setMinutes={setMinutes} setHours={setHours} />
            <span className="flex justify-between gap-8 w-full">
                <DefaultButton
                    onClick={() => {
                        setSelectedDay(null);
                        setCurrentDate(null);
                    }}
                >
                    Remove
                </DefaultButton>
                <DefaultButton onClick={() => {}}>Select</DefaultButton>
            </span>
        </div>
    );
}
