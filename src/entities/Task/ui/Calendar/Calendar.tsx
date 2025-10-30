'use client';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import React, { Dispatch, SetStateAction } from 'react';
import { HiMiniChevronLeft, HiMiniChevronRight } from 'react-icons/hi2';
import { YEARS } from '@entities/Task/consts/years';
import generateCalendarData from '@entities/Task/lib/generateCalendarData';
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

    const t = useTranslations('Main');
    const { DAYS, MONTHS } = generateCalendarData(t);

    return (
        <div className="flex flex-col items-center gap-4 w-sm py-2 px-6 bg-bg-primary">
            <p className="font-semibold text-center">{t('calendar.title')}</p>
            <div className="flex justify-between items-center gap-2 w-80.5">
                <DefaultButton
                    onClick={() => changeMonth(-1)}
                    ariaLabel={t('calendar.change.previousMonth')}
                >
                    <HiMiniChevronLeft size={24} />
                </DefaultButton>
                <div className="min-w-0 flex-1">
                    <Select
                        selected={selectedMonth}
                        setSelected={setSelectedMonth}
                        list={MONTHS}
                        ariaLabel={t('calendar.change.month')}
                    />
                </div>
                <div className="min-w-0 flex-1">
                    <Select
                        selected={selectedYear}
                        setSelected={setSelectedYear}
                        list={YEARS}
                        ariaLabel={t('calendar.change.year')}
                    />
                </div>
                <DefaultButton
                    onClick={() => changeMonth(1)}
                    ariaLabel={t('calendar.change.nextMonth')}
                >
                    <HiMiniChevronRight size={24} />
                </DefaultButton>
            </div>
            <div
                className="flex flex-wrap text-center w-80.5"
                role="grid"
                aria-label={`${selectedMonth.label} ${selectedYear.label}`}
            >
                {DAYS.map(w => (
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
                    const selected =
                        currentDate &&
                        isToday(i + 1, +selectedYear.id, +selectedMonth.id, currentDate);

                    const today = isToday(i + 1, +selectedYear.id, +selectedMonth.id, new Date());

                    return (
                        <button
                            key={i}
                            className={clsx(
                                'flex items-center justify-center w-11.5 h-11.5 p-4 rounded-sm cursor-pointer',
                                today && 'border border-bg-neutral-lighter',
                                selected && 'bg-bg-neutral-lighter/50',
                            )}
                            role="gridcell"
                            aria-selected={!!selected}
                            aria-label={`Select ${i + 1} ${selectedMonth.label} ${selectedYear.label}`}
                            onClick={() => changeDay(i + 1)}
                            type="button"
                        >
                            {i + 1}
                        </button>
                    );
                })}
            </div>
            <Time minutes={minutes} hours={hours} setMinutes={setMinutes} setHours={setHours} />
            <span className="flex justify-between gap-8 w-full">
                <DefaultButton onClick={removeDate} ariaLabel={t('calendar.remove')}>
                    {t('calendar.remove')}
                </DefaultButton>
                <DefaultButton
                    onClick={() => {
                        setSelectedDate(currentDate);
                        setIsOpen();
                    }}
                    ariaLabel={t('calendar.select')}
                >
                    {t('calendar.select')}
                </DefaultButton>
            </span>
        </div>
    );
}
