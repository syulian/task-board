import { createStateController } from './setObjectState';

describe('createStateController', () => {
    test('updates a single field correctly', () => {
        const setState = jest.fn();
        const controller = createStateController(setState);

        const prevState = { a: 1, b: 2 };
        controller('a', 42);

        const updater = setState.mock.calls[0][0];
        expect(updater(prevState)).toEqual({ a: 42, b: 2 });
    });
});
