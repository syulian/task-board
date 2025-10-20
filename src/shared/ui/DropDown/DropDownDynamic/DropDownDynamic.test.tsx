import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import DropDownDynamic from './DropDownDynamic';

describe('DropDownDynamic component', () => {
    const coordinates = { x: 69, y: 69 };
    const setIsOpenMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('does not render children when isOpen is false', () => {
        render(
            <DropDownDynamic coordinates={coordinates} isOpen={false} setIsOpen={setIsOpenMock}>
                <div>children</div>
            </DropDownDynamic>,
        );

        expect(screen.queryByText(/children/i)).toBeNull();
    });

    test('renders children when isOpen is true', () => {
        render(
            <DropDownDynamic coordinates={coordinates} isOpen={true} setIsOpen={setIsOpenMock}>
                <div>children</div>
            </DropDownDynamic>,
        );

        expect(screen.getByText(/children/i)).toBeInTheDocument();
    });

    test('calls setIsOpen when clicking on backdrop', () => {
        render(
            <DropDownDynamic coordinates={coordinates} isOpen={true} setIsOpen={setIsOpenMock}>
                <div>children</div>
            </DropDownDynamic>,
        );

        const backdrop = screen.getByTestId('backdrop')!;
        fireEvent.click(backdrop);
        expect(setIsOpenMock).toHaveBeenCalledTimes(1);
    });

    test('applies style left and top based on coordinates and viewport', () => {
        const rectMock = { width: 50, height: 50, x: 0, y: 0 } as DOMRect;
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(rectMock);

        Object.defineProperty(window, 'innerWidth', { writable: true, value: 500 });
        Object.defineProperty(window, 'innerHeight', { writable: true, value: 500 });

        render(
            <DropDownDynamic
                coordinates={{ x: 600, y: 600 }}
                isOpen={true}
                setIsOpen={setIsOpenMock}
            >
                <div>children</div>
            </DropDownDynamic>,
        );

        const dropdown = screen.getByText(/children/i).parentElement!;
        expect(parseInt(dropdown.style.left)).toBeLessThanOrEqual(500);
        expect(parseInt(dropdown.style.top)).toBeLessThanOrEqual(500);
    });
});
