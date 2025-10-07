export function getDate(date: string | Date) {
    const convertedDate = new Date(date);
    const currentDate = new Date();

    convertedDate.setHours(0, 0, 0, 0);
    currentDate.setHours(0, 0, 0, 0);

    const days = Math.floor((convertedDate.getTime() - currentDate.getTime()) / 86400000);

    if (days < 0) return 'Past Due';
    if (days === 0) return 'Due Today';
    if (days === 1) return 'Due Tomorrow';

    return `Due in ${days} days`;
}
