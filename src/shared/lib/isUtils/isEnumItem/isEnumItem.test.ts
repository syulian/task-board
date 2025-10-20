import { isEnumItem } from './isEnumItem';

enum Colors {
    BLUE = 'red',
    YELLOW = 'green',
}

enum Numbers {
    ONE = 1,
    TWO = 2,
}

describe('isEnumItem', () => {
    test('returns true for valid string enum value', () => {
        expect(isEnumItem(Colors, 'red')).toBe(true);
        expect(isEnumItem(Colors, 'green')).toBe(true);
    });

    test('returns false for invalid string enum value', () => {
        expect(isEnumItem(Colors, 'yellow')).toBe(false);
        expect(isEnumItem(Colors, 1)).toBe(false);
    });

    test('returns true for valid numeric enum value', () => {
        expect(isEnumItem(Numbers, 1)).toBe(true);
        expect(isEnumItem(Numbers, 2)).toBe(true);
    });

    test('returns false for invalid numeric enum value', () => {
        expect(isEnumItem(Numbers, 4)).toBe(false);
        expect(isEnumItem(Numbers, '1')).toBe(false);
    });

    test('returns false for null or undefined', () => {
        expect(isEnumItem(Colors, null)).toBe(false);
        expect(isEnumItem(Colors, undefined)).toBe(false);
    });
});
