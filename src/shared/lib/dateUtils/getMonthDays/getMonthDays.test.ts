import { getMonthDays } from './getMonthDays';

describe('getMonthDays', () => {
    test('returns correct number of days for a 31-day month', () => {
        const result = getMonthDays(2024, 0);
        expect(result.daysInMonth).toBe(31);
    });

    test('returns correct number of days for February non-leap year', () => {
        const result = getMonthDays(2023, 1);
        expect(result.daysInMonth).toBe(28);
    });

    test('returns correct number of days for February leap year', () => {
        const result = getMonthDays(2024, 1);
        expect(result.daysInMonth).toBe(29);
    });

    test('returns correct first day of the month', () => {
        const result = getMonthDays(2024, 9);
        expect(result.firstDay).toBe(2);
    });
});
