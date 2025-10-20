import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskLabel } from '@entities/Label';
import { TaskSchema } from '@entities/Task';
import messages from '@shared/config/i18n/messages/en.json';
import LabelController from './LabelController';

const mockLabels = [
    { id: '1', name: 'Feature', color: '#00ff00' },
    { id: '2', name: 'Bug', color: '#ff0000' },
] as TaskLabel[];

function Wrapper({ defaultLabels = [] }: { defaultLabels?: string[] }) {
    type TaskValues = z.infer<typeof TaskSchema>;
    const { control } = useForm<TaskValues>({
        defaultValues: {
            labels: defaultLabels,
        },
    });

    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <LabelController
                labels={mockLabels}
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                control={control}
            >
                <div>Child content</div>
            </LabelController>
        </NextIntlClientProvider>
    );
}

describe('LabelController', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders trigger button', () => {
        render(<Wrapper />);
        const btn = screen.getByRole('button', { name: /select labels/i });
        expect(btn).toBeInTheDocument();
    });

    test('opens dropdown on click', () => {
        render(<Wrapper />);
        const btn = screen.getByRole('button', { name: /select labels/i });
        fireEvent.click(btn);
        expect(screen.getByText(/feature/i)).toBeInTheDocument();
    });

    test('toggles label on click', () => {
        render(<Wrapper defaultLabels={['1']} />);
        fireEvent.click(screen.getByRole('button', { name: /select labels/i }));
        fireEvent.click(screen.getByText(/feature/i));
        fireEvent.click(screen.getByText(/bug/i));
        expect(screen.getByText(/bug/i)).toBeInTheDocument();
    });
});
