import { isToday } from './isToday';

describe('isToday', () => {
    const referenceDate = new Date('2025-10-17');

    test('returns true for the same day, month, and year', () => {
        expect(isToday(17, 2025, 9, referenceDate)).toBe(true);
    });

    test('returns false for different day', () => {
        expect(isToday(16, 2025, 9, referenceDate)).toBe(false);
    });

    test('returns false for different month', () => {
        expect(isToday(17, 2025, 8, referenceDate)).toBe(false);
    });

    test('returns false for different year', () => {
        expect(isToday(17, 2024, 9, referenceDate)).toBe(false);
    });
});
