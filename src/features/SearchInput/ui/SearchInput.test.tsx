import { MockedProvider, MockedProviderProps } from '@apollo/client/testing/react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '@shared/config/i18n/messages/en.json';
import { MOCKS } from '@shared/const';
import SearchInput from './SearchInput';

jest.mock('next/navigation', () => ({
    useParams: () => ({ id: '68ed5870f58a0f241c876682' }),
}));

function Wrapper({ mocks = [] }: { mocks?: MockedProviderProps['mocks'] }) {
    return (
        <MockedProvider mocks={mocks}>
            <NextIntlClientProvider locale="en" messages={messages}>
                <SearchInput />
            </NextIntlClientProvider>
        </MockedProvider>
    );
}

describe('SearchInput component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders input with placeholder text', () => {
        render(<Wrapper />);
        const input = screen.getByRole('searchbox');
        expect(input).toBeInTheDocument();
    });

    test('focus activates search dropdown', async () => {
        render(<Wrapper mocks={MOCKS} />);
        const input = screen.getByRole('searchbox');
        fireEvent.focus(input);
        await waitFor(() => {
            expect(screen.getByText(/no label/i)).toBeInTheDocument();
            expect(screen.getByText(/complete/i)).toBeInTheDocument();
            expect(screen.getByText(/due date/i)).toBeInTheDocument();
            expect(screen.getByText(/important/i)).toBeInTheDocument();
        });
    });

    test('displays tasks when filters are selected', async () => {
        render(<Wrapper mocks={MOCKS} />);
        const input = screen.getByRole('searchbox');
        fireEvent.focus(input);
        const label = await screen.findByText(/important/i);
        fireEvent.click(label);
        await waitFor(() => {
            expect(screen.getByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument();
        });
    });

    test('resets search state on blur', async () => {
        render(<Wrapper mocks={MOCKS} />);
        const input = screen.getByRole('searchbox');
        fireEvent.focus(input);
        expect(await screen.findByText(/important/i)).toBeInTheDocument();
        fireEvent.blur(input);
        await waitFor(() => {
            expect(screen.queryByText(/important/i)).not.toBeInTheDocument();
        });
    });
});
