import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import ConfirmButton from './ConfirmButton';

describe('ConfirmButton component', () => {
    test('renders children', () => {
        render(<ConfirmButton ariaLabel="confirm">Click me</ConfirmButton>);
        expect(screen.getByText(/click me/i)).toBeInTheDocument();
    });

    test('calls onClick when clicked', () => {
        const handleClick = jest.fn();
        render(
            <ConfirmButton ariaLabel="confirm" onClick={handleClick}>
                Click me
            </ConfirmButton>,
        );
        fireEvent.click(screen.getByRole('button', { name: 'confirm' }));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    test('has correct aria-label', () => {
        render(<ConfirmButton ariaLabel="confirm">Click me</ConfirmButton>);
        expect(screen.getByRole('button', { name: 'confirm' })).toBeInTheDocument();
    });

    test('renders error text when provided', () => {
        render(
            <ConfirmButton ariaLabel="confirm" error="Something went wrong">
                Click me
            </ConfirmButton>,
        );
        expect(screen.getByText('Something went wrong')).toBeInTheDocument();
    });

    test('defaults type to button', () => {
        render(<ConfirmButton ariaLabel="confirm">Click me</ConfirmButton>);
        expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    });

    test('uses provided type', () => {
        render(
            <ConfirmButton ariaLabel="confirm" type="submit">
                Click me
            </ConfirmButton>,
        );
        expect(screen.getByRole('button')).toHaveAttribute('type', 'submit');
    });
});
