import { useTranslations } from 'next-intl';

type TFunction = ReturnType<typeof useTranslations<never>>;

const generateCalendarData = (t: TFunction) => {
    const DAYS = Array.from({ length: 7 }).map((_, i) => t(`calendar.days.${i}`));
    const MONTHS = Array.from({ length: 12 }).map((_, i) => ({
        id: i.toString(),
        label: t(`calendar.months.${i}`),
    }));

    return { DAYS, MONTHS };
};

export default generateCalendarData;
