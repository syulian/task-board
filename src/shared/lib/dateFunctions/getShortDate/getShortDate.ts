export function getShortDate(date: string | Date, locale: string = 'default') {
    const convertedDate = new Date(date);

    const day = convertedDate.toLocaleString(locale, { weekday: 'long' });
    const month = convertedDate.toLocaleString(locale, { month: 'short' });

    return `${day}, ${month} ${convertedDate.getDate()}`;
}
