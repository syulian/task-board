'use client';
import { clsx } from 'clsx';
import React, { Dispatch, SetStateAction } from 'react';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';
import { MONTHS } from '@entities/Task/consts/months';
import { WEEK_NAMES } from '@entities/Task/consts/weeks';
import { YEARS } from '@entities/Task/consts/years';
import useCalendar from '@entities/Task/lib/hooks/useCalendar';
import { getMonthDays, isToday } from '@shared/lib';
import { Select, Time, DefaultButton } from '@shared/ui';

interface ICalendarProps {
    selectedDate: Date | null;
    setSelectedDate: Dispatch<SetStateAction<Date | null>>;
    setIsOpen: () => void;
}

export default function Calendar({ selectedDate, setSelectedDate, setIsOpen }: ICalendarProps) {
    const {
        currentDate,
        hours,
        setHours,
        minutes,
        setMinutes,
        selectedYear,
        setSelectedYear,
        selectedMonth,
        setSelectedMonth,
        removeDate,
        changeMonth,
        changeDay,
    } = useCalendar(selectedDate, setSelectedDate, setIsOpen);

    const { firstDay, daysInMonth } = getMonthDays(+selectedYear.id, +selectedMonth.id);

    return (
        <div className="flex flex-col items-center gap-4 w-sm py-2 px-6">
            <p className="font-semibold text-center">Set Due Date</p>
            <div className="flex justify-between items-center gap-2 w-80.5">
                <DefaultButton onClick={() => changeMonth(-1)}>
                    <HiMiniChevronLeft size={24} />
                </DefaultButton>
                <div className="min-w-0 flex-1">
                    <Select selected={selectedMonth} setSelected={setSelectedMonth} list={MONTHS} />
                </div>
                <div className="min-w-0 flex-1">
                    <Select selected={selectedYear} setSelected={setSelectedYear} list={YEARS} />
                </div>
                <DefaultButton onClick={() => changeMonth(1)}>
                    <HiMiniChevronRight size={24} />
                </DefaultButton>
            </div>
            <div
                className="flex flex-wrap text-center w-80.5"
                role="grid"
                aria-label={`${selectedMonth.label} ${selectedYear.label}`}
            >
                {WEEK_NAMES.map(w => (
                    <div
                        key={w}
                        className="flex items-center justify-center w-11.5 font-bold"
                        role="columnheader"
                    >
                        {w}
                    </div>
                ))}
                {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={i} className="w-11.5 h-11.5" role="gridcell" aria-hidden="true" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                    const isSelected =
                        currentDate && isToday(i, +selectedYear.id, +selectedMonth.id, currentDate);

                    const today = isToday(i + 1, +selectedYear.id, +selectedMonth.id, new Date());

                    return (
                        <button
                            key={i}
                            className={clsx(
                                'flex items-center justify-center w-11.5 h-11.5 p-4 rounded-sm cursor-pointer',
                                today && 'border border-surface-lighter',
                                isSelected && 'bg-surface-lighter/50',
                            )}
                            role="gridcell"
                            aria-selected={!!isSelected}
                            aria-label={`Select ${i + 1} ${selectedMonth.label} ${selectedYear.label}`}
                            onClick={() => changeDay(i)}
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
            <Time minutes={minutes} hours={hours} setMinutes={setMinutes} setHours={setHours} />
            <span className="flex justify-between gap-8 w-full">
                <DefaultButton onClick={removeDate}>Remove</DefaultButton>
                <DefaultButton
                    onClick={() => {
                        setSelectedDate(currentDate);
                        setIsOpen();
                    }}
                >
                    Select
                </DefaultButton>
            </span>
        </div>
    );
}
