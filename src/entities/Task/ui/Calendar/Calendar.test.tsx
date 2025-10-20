import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '@shared/config/i18n/messages/en.json';
import Calendar from './Calendar';

describe('Calendar component', () => {
    const setSelectedDate = jest.fn();
    const setIsOpen = jest.fn();

    const Wrapper = ({ date = null }: { date?: Date | null }) => {
        return (
            <NextIntlClientProvider locale="en" messages={messages}>
                <Calendar
                    selectedDate={date}
                    setSelectedDate={setSelectedDate}
                    setIsOpen={setIsOpen}
                />
            </NextIntlClientProvider>
        );
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders calendar title', () => {
        render(<Wrapper />);
        expect(screen.getByText(/set due date/i)).toBeInTheDocument();
    });

    test('clicks a day and marks it selected', () => {
        render(<Wrapper date={new Date('Mon Oct 20 2025 10:19:21 GMT+0200')} />);
        const dayButton = screen.getByLabelText(/select 29 october 2025/i);
        fireEvent.click(dayButton);
        expect(dayButton).toHaveAttribute('aria-selected', 'true');
    });

    test('calls removeDate when "remove" button is clicked', () => {
        render(<Wrapper />);
        const removeBtn = screen.getByRole('button', { name: /remove/i });
        fireEvent.click(removeBtn);
        expect(setSelectedDate).toHaveBeenCalledWith(null);
        expect(setIsOpen).toHaveBeenCalled();
    });

    test('changes month when next/previous buttons are clicked', () => {
        render(<Wrapper date={new Date('Mon Oct 20 2025 10:19:21 GMT+0200')} />);

        const nextBtn = screen.getByRole('button', {
            name: /set next month/i,
        });
        const prevBtn = screen.getByRole('button', {
            name: /set previous month/i,
        });

        fireEvent.click(nextBtn);
        expect(screen.getByText(/november/i)).toBeInTheDocument();
        fireEvent.click(prevBtn);
        expect(screen.getByText(/october/i)).toBeInTheDocument();
    });
});
