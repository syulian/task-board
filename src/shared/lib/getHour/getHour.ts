function padZero(time: number) {
    return time.toString().padStart(2, '0');
}

export function getHour(date: string | Date) {
    const convertedDate = new Date(date);

    return `${padZero(convertedDate.getHours())}:${padZero(convertedDate.getMinutes())}`;
}
