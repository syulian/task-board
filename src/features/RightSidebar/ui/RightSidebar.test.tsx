import { MockedProvider, MockedProviderProps } from '@apollo/client/testing/react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@shared/config/i18n/messages/en.json';
import { renderWithProviders } from '@shared/lib';
import { GetGroupedTasksDocument } from '@shared/types';
import RightSidebar from './RightSidebar';

const mocks = [
    {
        request: {
            query: GetGroupedTasksDocument,
        },
        result: {
            data: {
                getGroupedTasks: [
                    {
                        __typename: 'TaskGroupByDate',
                        date: '2025-10-29T00:00:00.000Z',
                        tasks: [
                            {
                                __typename: 'TaskGroup',
                                id: '68f0ec86caffecf2f10b9b35',
                                title: 'task',
                                body: 'Task body',
                                dueDate: '2025-10-29T23:00:00.000Z',
                                complete: true,
                                board: {
                                    __typename: 'Board',
                                    id: '68ed5870f58a0f241c876238',
                                    name: 'Task Board',
                                },
                                list: {
                                    __typename: 'List',
                                    id: '68ed587af58a0f241c876641',
                                    name: 'To do',
                                },
                            },
                        ],
                    },
                ],
            },
        },
    },
];

function renderedWrapper({
    mocks = [],
    isExpanded = false,
}: {
    mocks?: MockedProviderProps['mocks'];
    isExpanded?: boolean;
}) {
    return renderWithProviders(
        <MockedProvider mocks={mocks}>
            <NextIntlClientProvider locale="en" messages={messages}>
                <RightSidebar />
            </NextIntlClientProvider>
        </MockedProvider>,
        {
            preloadedState: {
                rightSidebar: { isExpanded: isExpanded },
            },
        },
    );
}

describe('RightSidebar component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('does not render when isExpanded = false', () => {
        const { queryByText } = renderedWrapper({});
        expect(queryByText(/upcoming tasks/i)).not.toBeInTheDocument();
    });

    test('renders when isExpanded = true', () => {
        renderedWrapper({ mocks, isExpanded: true });
        expect(screen.getByText(/upcoming tasks/i)).toBeInTheDocument();
    });

    test('toggles dropdown and dispatches on click', async () => {
        renderedWrapper({ mocks, isExpanded: true });

        const btn = screen.getByRole('button', { name: /open panel settings/i });
        fireEvent.click(btn);
        const option = screen.getByText(/hide panel/i);
        fireEvent.click(option);
        await waitFor(() => {
            expect(screen.queryByText(/upcoming tasks/i)).not.toBeInTheDocument();
        });
    });

    test('renders grouped tasks', async () => {
        renderedWrapper({ mocks, isExpanded: true });
        expect(await screen.findByText(/task body/i)).toBeInTheDocument();
    });
});
