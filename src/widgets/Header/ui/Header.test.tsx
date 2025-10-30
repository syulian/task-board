import { MockedProvider } from '@apollo/client/testing/react';
import { fireEvent, screen } from '@testing-library/react';
import { useSession } from 'next-auth/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@shared/config/i18n/messages/en.json';
import { MOCKS, BOARD_ID } from '@shared/const';
import { renderWithProviders } from '@shared/lib';
import Header from './Header';

jest.mock('next-auth/react', () => ({
    useSession: jest.fn(),
}));

jest.mock('next/navigation', () => ({
    useRouter: () => ({
        replace: () => {},
    }),
    useParams: () => ({ id: BOARD_ID }),
}));

function renderWrapper({ isExpanded = false }: { isExpanded?: boolean }) {
    return renderWithProviders(
        <MockedProvider mocks={MOCKS}>
            <NextIntlClientProvider locale="en" messages={messages}>
                <Header />
            </NextIntlClientProvider>
        </MockedProvider>,
        {
            preloadedState: {
                rightSidebar: {
                    isExpanded: isExpanded,
                },
            },
        },
    );
}

describe('Header component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders header when authenticated', () => {
        (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
        renderWrapper({});
        expect(screen.getByLabelText(/open information about the board/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/search for tasks/i)).toBeInTheDocument();
    });

    test('does not render when unauthenticated', () => {
        (useSession as jest.Mock).mockReturnValueOnce({ status: 'unauthenticated' });
        renderWrapper({});
        expect(screen.queryByTestId('BoardInfo')).not.toBeInTheDocument();
    });

    test('opens popup on tag button click', async () => {
        (useSession as jest.Mock).mockReturnValue({ status: 'authenticated' });
        renderWrapper({});
        const tagButton = screen.getByLabelText(/edit labels/i);
        fireEvent.click(tagButton);
        expect(await screen.findByRole('dialog')).toBeInTheDocument();
    });

    test('dispatches sidebar toggle on click', async () => {
        renderWrapper({});
        fireEvent.click(screen.getByLabelText(/open panel/i));
        fireEvent.click(screen.getByLabelText(/hide panel/i));
    });
});
