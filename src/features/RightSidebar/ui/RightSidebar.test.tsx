import { MockedProvider, MockedProviderProps } from '@apollo/client/testing/react';
import { screen, fireEvent, waitFor } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@shared/config/i18n/messages/en.json';
import { MOCKS } from '@shared/const';
import { renderWithProviders } from '@shared/lib';
import RightSidebar from './RightSidebar';

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
        renderedWrapper({ mocks: MOCKS, isExpanded: true });
        expect(screen.getByText(/upcoming tasks/i)).toBeInTheDocument();
    });

    test('toggles dropdown and dispatches on click', async () => {
        renderedWrapper({ mocks: MOCKS, isExpanded: true });

        const btn = screen.getByRole('button', { name: /open panel settings/i });
        fireEvent.click(btn);
        const option = screen.getByText(/hide panel/i);
        fireEvent.click(option);
        await waitFor(() => {
            expect(screen.queryByText(/upcoming tasks/i)).not.toBeInTheDocument();
        });
    });

    test('renders grouped tasks', async () => {
        renderedWrapper({ mocks: MOCKS, isExpanded: true });
        expect(await screen.findByText(/lorem ipsum dolor sit amet/i)).toBeInTheDocument();
    });
});
