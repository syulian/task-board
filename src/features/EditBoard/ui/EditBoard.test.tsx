import { MockedProvider, MockedProviderProps } from '@apollo/client/testing/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { render, screen, fireEvent } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import React from 'react';
import { EditBoardSchema } from '@entities/Board';
import messages from '@shared/config/i18n/messages/en.json';
import EditBoard from './EditBoard';

const deleteSpy = jest.fn();
jest.mock('../lib/hooks/useEditBoard', () => {
    const { useForm } = jest.requireActual('react-hook-form');
    return {
        __esModule: true,
        default: function useEditBoardMock() {
            const form = useForm({
                resolver: zodResolver(EditBoardSchema),
                defaultValues: {
                    name: '',
                    group: { id: 'select', label: 'Select group' },
                },
            });

            return {
                ...form,
                onSubmit: jest.fn(),
                groups: [{ id: '1', label: 'Group 1' }],
                labels: [{ id: 'l1', name: 'Label 1', color: '#ff0000' }],
                handleDelete: deleteSpy,
                errors: { name: undefined },
            };
        },
    };
});

function Wrapper({
    mocks,
    openLabelPopup = jest.fn(),
}: {
    mocks: MockedProviderProps['mocks'];
    openLabelPopup?: () => void;
}) {
    return (
        <MockedProvider mocks={mocks}>
            <NextIntlClientProvider locale="en" messages={messages}>
                <EditBoard openLabelPopup={openLabelPopup} />
            </NextIntlClientProvider>
        </MockedProvider>
    );
}

describe('EditBoard component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders form fields and labels', () => {
        render(<Wrapper mocks={[]} />);
        expect(screen.getByText(/board name/i)).toBeInTheDocument();
        expect(screen.getByText(/^\s*labels\s*$/i)).toBeInTheDocument();
        expect(screen.getByText(/label 1/i)).toBeInTheDocument();
    });

    test('calls openLabelPopup when button clicked', () => {
        const openLabelPopup = jest.fn();
        render(<Wrapper mocks={[]} openLabelPopup={openLabelPopup} />);
        fireEvent.click(screen.getByRole('button', { name: /configure labels/i }));
        expect(openLabelPopup).toHaveBeenCalled();
    });

    test('calls handleDelete on label click', () => {
        render(<Wrapper mocks={[]} />);
        const button = screen.getByRole('button', { name: /delete label/i });
        fireEvent.click(button);
        expect(deleteSpy).toHaveBeenCalledWith('l1');
    });
});
