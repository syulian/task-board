import TFunction from '@shared/types/TFunction';

export function getDate(date: string | Date, t: TFunction) {
    const convertedDate = new Date(date);
    const currentDate = new Date();

    convertedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const days = Math.floor((convertedDate.getTime() - currentDate.getTime()) / 86400000);

    if (days < 0) return t('date.pastDue');
    if (days === 0) return t('date.dueToday');
    if (days === 1) return t('date.dueTomorrow');

    return t('date.dueIn', { days });
}
