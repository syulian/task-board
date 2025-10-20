import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { useForm } from 'react-hook-form';
import messages from '@shared/config/i18n/messages/en.json';
import LabelController from './LabelController';

function Wrapper() {
    const { control } = useForm({
        defaultValues: {
            color: '#d62828',
            name: 'Important',
        },
    });

    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <LabelController control={control} />
        </NextIntlClientProvider>
    );
}

describe('LabelController component', () => {
    test('renders color button and input', () => {
        render(<Wrapper />);
        const colorBtn = screen.getByRole('button');
        expect(colorBtn).toBeInTheDocument();
        const input = screen.getByPlaceholderText(/type here and press 'enter'/i);
        expect(input).toBeInTheDocument();
    });

    test('opens dropdown on color button click', () => {
        render(<Wrapper />);
        const colorBtn = screen.getByRole('button');
        fireEvent.click(colorBtn);
        const dropdown = screen.getByTestId('dropdown-static');
        expect(dropdown).toBeInTheDocument();
    });

    test('changes color on dropdown item click', () => {
        render(<Wrapper />);
        const colorBtn = screen.getByRole('button');
        fireEvent.click(colorBtn);
        const colorOption = screen.getByLabelText(/change the color of the label/i);
        fireEvent.click(colorOption);
    });

    test('updates name field on input change', () => {
        render(<Wrapper />);
        const input = screen.getByPlaceholderText(/type here and press 'enter'/i);
        fireEvent.change(input, { target: { value: 'Test label' } });
        expect(input).toHaveValue('Test label');
    });
});
