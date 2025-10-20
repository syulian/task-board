import { fireEvent, render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import messages from '@shared/config/i18n/messages/en.json';
import TaskLabel from '../../model/types/TaskLabel';
import LabelDropDown from './LabelDropDown';

function Wrapper({ selected, onChange }: { selected?: string[]; onChange: (id: string) => void }) {
    const labels = [
        { id: '1', name: 'Bug', color: '#f00' },
        { id: '2', name: 'Feature', color: '#0f0' },
    ] as TaskLabel[];

    return (
        <NextIntlClientProvider locale="en" messages={messages}>
            <LabelDropDown labels={labels} selected={selected} onChange={onChange} />
        </NextIntlClientProvider>
    );
}

describe('LabelDropDown component', () => {
    test('renders title', () => {
        render(<Wrapper selected={[]} onChange={() => {}} />);
        expect(screen.getByText(/select labels/i)).toBeInTheDocument();
    });

    test('renders all labels', () => {
        render(<Wrapper selected={[]} onChange={() => {}} />);
        expect(screen.getAllByRole('checkbox').length).toBe(2);
    });

    test('marks selected labels as active', () => {
        render(<Wrapper selected={['2']} onChange={() => {}} />);
        const input = screen.getAllByRole('checkbox')[1];
        expect(input).toBeChecked();
    });

    test('calls onChange when label clicked', () => {
        const handleChange = jest.fn();
        render(<Wrapper selected={[]} onChange={handleChange} />);
        fireEvent.click(screen.getByText('Feature'));
        expect(handleChange).toHaveBeenCalledWith('2');
    });
});
