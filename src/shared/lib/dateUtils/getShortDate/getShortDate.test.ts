import { getShortDate } from './getShortDate';

describe('getShortDate', () => {
    test('returns date in default locale', () => {
        const date = new Date('2025-10-17');
        const result = getShortDate(date);
        expect(result).toMatch(/\w+, \w+ 17/);
    });

    test('returns date in English locale', () => {
        const date = new Date('2025-01-15');
        const result = getShortDate(date, 'en');
        expect(result).toBe('Wednesday, Jan 15');
    });

    test('returns date in Ukrainian locale', () => {
        const date = new Date('2025-01-15');
        const result = getShortDate(date, 'uk');
        expect(result).toBe('середа, січ. 15');
    });

    test('accepts date string input', () => {
        const result = getShortDate('2025-03-05', 'en');
        expect(result).toBe('Wednesday, Mar 5');
    });
});
