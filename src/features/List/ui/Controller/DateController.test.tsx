import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskSchema } from '@entities/Task';
import messages from '@shared/config/i18n/messages/en.json';
import DateController from './DateController';

function Wrapper({ dueDate = null }: { dueDate?: Date | null }) {
    type TaskValues = z.infer<typeof TaskSchema>;
    const { control } = useForm<TaskValues>({
        defaultValues: {
            dueDate,
        },
    });

    const [isOpen, setIsOpen] = useState(false);

    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <DateController
                dueDate={dueDate}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                control={control}
            />
        </NextIntlClientProvider>
    );
}

describe('DateController', () => {
    test('renders with initial "None"', () => {
        render(<Wrapper dueDate={null} />);
        expect(screen.getByRole('button', { name: /due date/i })).toHaveTextContent('None');
    });

    test('opens calendar on button click', () => {
        render(<Wrapper />);
        const btn = screen.getByRole('button', { name: /due date/i });
        fireEvent.click(btn);
        expect(screen.getByText('Set Due Date')).toBeInTheDocument();
    });
});
