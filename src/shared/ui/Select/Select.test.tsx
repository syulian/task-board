import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '@shared/config/i18n/messages/en.json';
import Select from './Select';

const list = [
    { id: '1', label: 'one' },
    { id: '2', label: 'two' },
];

function Wrapper() {
    const [selected, setSelected] = React.useState(list[0]);
    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <Select
                list={list}
                selected={selected}
                setSelected={setSelected}
                ariaLabel="select-item"
            />
        </NextIntlClientProvider>
    );
}

describe('Select component', () => {
    test('renders selected value', () => {
        render(<Wrapper />);
        expect(screen.getByText(/one/i)).toBeInTheDocument();
    });

    test('opens list on click', () => {
        render(<Wrapper />);
        fireEvent.click(screen.getByRole('button'));
        expect(screen.getByRole('listbox')).toBeInTheDocument();
    });

    test('selects new item and closes list', () => {
        render(<Wrapper />);
        fireEvent.click(screen.getByRole('button'));
        const option = screen.getByText(/two/i);

        fireEvent.click(option);
        expect(screen.queryByRole('listbox')).not.toBeInTheDocument();
        expect(screen.getByText(/two/i)).toBeInTheDocument();
    });

    test('aria-label applies to items', () => {
        render(<Wrapper />);
        fireEvent.click(screen.getByRole('button'));
        const buttons = screen.getAllByLabelText('select-item');
        expect(buttons.length).toBe(2);
    });
});
