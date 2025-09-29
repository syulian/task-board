export function getShortDate(date: string | Date) {
    const convertedDate = new Date(date);

    const day = convertedDate.toLocaleString('default', { weekday: 'long' });
    const month = convertedDate.toLocaleString('default', { month: 'short' });

    return `${day}, ${month} ${convertedDate.getDay()}`;
}
