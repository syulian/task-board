import { MockedProvider } from '@apollo/client/testing/react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { Planned } from '@entities/Task';
import messages from '@shared/config/i18n/messages/en.json';
import { UpdateTaskDocument } from '@shared/types';
import GroupTask from '../model/types/GroupTask';

const task = {
    id: '1',
    body: 'Test body',
    complete: false,
    dueDate: '2025-01-01T10:00:00Z',
    list: { id: '10', name: 'List A' },
    board: { name: 'Board X' },
} as GroupTask;

const mocks = [
    {
        request: {
            query: UpdateTaskDocument,
            variables: { task: { id: task.id, list: task.list.id, complete: !task.complete } },
        },
        result: {
            data: {
                updateTask: { ...task, complete: !task.complete },
            },
        },
    },
];

function Wrapper() {
    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <Planned task={task} />
        </NextIntlClientProvider>
    );
}

describe('Planned component', () => {
    beforeAll(() => {
        jest.spyOn(console, 'error').mockImplementation(() => {});
    });

    test('renders task content correctly', () => {
        render(
            <MockedProvider mocks={[]}>
                <Wrapper />
            </MockedProvider>,
        );
        expect(screen.getByText(/test body/i)).toBeInTheDocument();
        expect(screen.getByText(/board x \/ list a/i)).toBeInTheDocument();
    });

    test('opens context menu on right click', () => {
        render(
            <MockedProvider mocks={[]}>
                <Wrapper />
            </MockedProvider>,
        );
        const row = screen.getByText(/test body/i).closest('div')!;
        fireEvent.contextMenu(row);
        expect(screen.getByText(/mark as complete/i)).toBeInTheDocument();
    });

    test('closes context menu after clicking option', async () => {
        render(
            <MockedProvider mocks={mocks}>
                <Wrapper />
            </MockedProvider>,
        );
        const row = screen.getByText(/test body/i).closest('div')!;
        fireEvent.contextMenu(row);
        const btn = screen.getByText(/mark as complete/i);
        fireEvent.click(btn);
        await waitFor(() => {
            expect(screen.queryByText(/mark as complete/i)).not.toBeInTheDocument();
        });
    });

    afterAll(() => {
        (console.error as jest.Mock).mockRestore();
    });
});
