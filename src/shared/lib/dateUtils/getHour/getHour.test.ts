import { padZero, getHour } from './getHour';

describe('padZero', () => {
    test('adds leading zero for single-digit numbers', () => {
        expect(padZero(0)).toBe('00');
        expect(padZero(5)).toBe('05');
    });

    test('does not add extra zero for two-digit numbers', () => {
        expect(padZero(10)).toBe('10');
        expect(padZero(23)).toBe('23');
    });
});

describe('getHour', () => {
    test('formats Date object correctly', () => {
        const date = new Date('2025-10-17T03:07:00');
        expect(getHour(date)).toBe('03:07');
    });

    test('formats date string correctly', () => {
        const dateStr = '2025-10-17T15:45:00';
        expect(getHour(dateStr)).toBe('15:45');
    });

    test('pads hours and minutes with zero when needed', () => {
        const date = new Date('2025-10-17T09:05:00');
        expect(getHour(date)).toBe('09:05');
    });
});
