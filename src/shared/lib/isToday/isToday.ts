export function isToday(day: number, year: number, month: number, date: Date) {
    return date.getDate() === day && date.getMonth() === month && date.getFullYear() === year;
}
