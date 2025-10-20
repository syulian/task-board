import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import messages from '@shared/config/i18n/messages/en.json';
import { CreateBoardDocument } from '@shared/types';
import AddBoardDropDown from './AddBoardDropDown';

const groupId = '68ed5aecf58a0f241c876731';

const mocks = [
    {
        request: {
            query: CreateBoardDocument,
            variables: { name: 'Test Board', order: 1, groupId },
        },
        result: {
            data: {
                createBoard: { id: '1', name: 'Test Board' },
            },
        },
    },
];

function Wrapper() {
    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <AddBoardDropDown groupId={groupId} />
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
            <MockedProvider mocks={mocks}>
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
        const errorMocks = [
            {
                request: {
                    query: CreateBoardDocument,
                    variables: { name: 'Fail Board', order: 1, groupId },
                },
                error: new Error('Network error'),
            },
        ];

        render(
            <MockedProvider mocks={errorMocks}>
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
