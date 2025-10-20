import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { FieldError, useForm } from 'react-hook-form';
import FormField from './FormField';

interface FormValues {
    name: string;
}

function Wrapper({ error }: { error?: FieldError }) {
    const { register } = useForm<FormValues>();
    return <FormField label="Name" name="name" register={register} error={error} />;
}

describe('FormField component', () => {
    test('renders label and input', () => {
        render(<Wrapper />);
        expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    test('renders error message if provided', () => {
        render(<Wrapper error={{ type: 'name', message: 'Required' }} />);
        expect(screen.getByText(/required/i)).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAttribute('aria-invalid', 'true');
    });

    test('prevents Enter key default', () => {
        render(<Wrapper />);
        const input = screen.getByLabelText(/name/i);
        const preventDefault = jest.fn();
        fireEvent.keyDown(input, { key: 'Enter', preventDefault });
        expect(preventDefault).not.toHaveBeenCalled();
    });
});
