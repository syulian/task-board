import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '@shared/config/i18n/messages/en.json';
import { MOCKS, GROUP_ID, ERROR_MOCKS } from '@shared/const';
import AddBoardDropDown from './AddBoardDropDown';

function Wrapper() {
    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <AddBoardDropDown groupId={GROUP_ID} />
        </NextIntlClientProvider>
    );
}

describe('AddBoardDropDown component', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('renders form with input and button', () => {
        render(
            <MockedProvider mocks={[]}>
                <Wrapper />
            </MockedProvider>,
        );

        expect(screen.getByPlaceholderText(/enter name.../i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add board/i })).toBeInTheDocument();
    });

    test('shows validation error if input is empty', async () => {
        render(
            <MockedProvider mocks={[]}>
                <Wrapper />
            </MockedProvider>,
        );

        await userEvent.click(screen.getByRole('button', { name: /add board/i }));
        expect(screen.getByText(/board name is too short/i)).toBeInTheDocument();
    });

    test('submits form with valid input', async () => {
        render(
            <MockedProvider mocks={MOCKS}>
                <Wrapper />
            </MockedProvider>,
        );

        fireEvent.change(screen.getByPlaceholderText(/enter name.../i), {
            target: { value: 'Test Board' },
        });
        await userEvent.click(screen.getByRole('button', { name: /add board/i }));
        expect(screen.queryByText(/error/i)).not.toBeInTheDocument();
    });

    test('displays error if mutation fails', async () => {
        render(
            <MockedProvider mocks={ERROR_MOCKS}>
                <Wrapper />
            </MockedProvider>,
        );

        fireEvent.change(screen.getByPlaceholderText(/enter name.../i), {
            target: { value: 'Fail Board' },
        });
        await userEvent.click(screen.getByRole('button', { name: /add board/i }));
        expect(await screen.findByText(/network error/i)).toBeInTheDocument();
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
    });
});
