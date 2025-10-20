import { clearTypename } from './clearTypename';

describe('clearTypename', () => {
    test('removes __typename from flat object', () => {
        const input = { a: 1, __typename: 'Test' };
        const result = clearTypename(input);
        expect(result).toEqual({ a: 1 });
    });

    test('removes __typename from nested objects', () => {
        const input = {
            a: {
                b: {
                    __typename: 'Nested',
                },
            },
            __typename: 'Root',
        };
        const result = clearTypename(input);
        expect(result).toEqual({ a: { b: {} } });
    });

    test('removes __typename inside arrays', () => {
        const input = [
            { id: 1, __typename: 'Item' },
            { id: 2, nested: { __typename: 'Inner' } },
        ];
        const result = clearTypename(input);
        expect(result).toEqual([{ id: 1 }, { id: 2, nested: {} }]);
    });

    test('keeps primitive values untouched', () => {
        expect(clearTypename(42)).toBe(42);
        expect(clearTypename('text')).toBe('text');
        expect(clearTypename(null)).toBeNull();
    });

    test('ignores missing __typename fields', () => {
        const input = { x: 1, y: { z: 2 } };
        const result = clearTypename(input);
        expect(result).toEqual({ x: 1, y: { z: 2 } });
    });
});
