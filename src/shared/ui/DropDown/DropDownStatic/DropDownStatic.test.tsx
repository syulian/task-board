import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import DropDownStatic from './DropDownStatic';

describe('DropDownStatic component', () => {
    const setIsOpenMock = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('does not render when isOpen is false', () => {
        render(
            <DropDownStatic isOpen={false} setIsOpen={setIsOpenMock}>
                <div>children</div>
            </DropDownStatic>,
        );

        expect(screen.queryByText(/children/i)).toBeNull();
    });

    test('renders children when isOpen is true', () => {
        render(
            <DropDownStatic isOpen={true} setIsOpen={setIsOpenMock}>
                <div>children</div>
            </DropDownStatic>,
        );

        expect(screen.getByText(/children/i)).toBeInTheDocument();
    });

    test('calls setIsOpen when clicking on backdrop', () => {
        render(
            <DropDownStatic isOpen={true} setIsOpen={setIsOpenMock}>
                <div>children</div>
            </DropDownStatic>,
        );

        const backdrop = screen.getByTestId('backdrop')!;
        fireEvent.click(backdrop);

        expect(setIsOpenMock).toHaveBeenCalledTimes(1);
    });

    test('applies custom className to dropdown container', () => {
        render(
            <DropDownStatic isOpen={true} setIsOpen={setIsOpenMock} className="custom-class">
                <div>children</div>
            </DropDownStatic>,
        );

        const dropdown = screen.getByText(/children/i).parentElement;
        expect(dropdown?.className).toMatch(/custom-class/);
    });
});
