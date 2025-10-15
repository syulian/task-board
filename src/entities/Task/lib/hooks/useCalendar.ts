import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import generateCalendarData from '@entities/Task/lib/generateCalendarData';

export default function useCalendar(
    selectedDate: Date | null,
    setSelectedDate: Dispatch<SetStateAction<Date | null>>,
    setIsOpen: () => void,
) {
    const [currentDate, setCurrentDate] = useState<Date | null>(selectedDate);

    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    const [selectedDay, setSelectedDay] = useState<number | null>(null);

    const t = useTranslations('Main');
    const { MONTHS } = generateCalendarData(t);

    const [selectedMonth, setSelectedMonth] = useState(() => {
        const month = new Date().getMonth();
        return { id: month.toString(), label: MONTHS[month].label };
    });

    const [selectedYear, setSelectedYear] = useState(() => {
        const year = new Date().getFullYear().toString();
        return { id: year, label: year };
    });

    useEffect(() => {
        if (typeof selectedDay !== 'number') return;
        const year = +selectedYear.id;
        const month = +selectedMonth.id;

        setCurrentDate(new Date(year, month, selectedDay, hours, minutes));
    }, [selectedYear, selectedMonth, selectedDay, hours, minutes]);

    useEffect(() => {
        if (!selectedDate) return;
        const year = selectedDate.getFullYear().toString();
        const month = selectedDate.getMonth();

        setCurrentDate(selectedDate);
        setSelectedYear({ id: year, label: year });
        setSelectedMonth({ id: month.toString(), label: MONTHS[month].label });
        setSelectedDay(selectedDate.getDate());
        setHours(selectedDate.getHours());
        setMinutes(selectedDate.getMinutes());
    }, [selectedDate]);

    const changeMonth = (direction: -1 | 1) => {
        setSelectedMonth(prev => {
            let month = +prev.id + direction;
            let year = +selectedYear.id;

            if (month < 0) {
                month = 11;
                year -= 1;
            } else if (month > 11) {
                month = 0;
                year += 1;
            }

            setSelectedYear({ id: year.toString(), label: year.toString() });
            return { id: month.toString(), label: MONTHS[month].label };
        });
    };

    const changeDay = (day: number) => {
        setSelectedDay(prev => (prev === day ? null : day));
    };

    const removeDate = () => {
        setSelectedDay(null);
        setCurrentDate(null);
        setSelectedDate(null);
        setIsOpen();
    };

    return {
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
    };
}
