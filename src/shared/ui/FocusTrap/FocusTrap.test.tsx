import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React, { useRef } from 'react';
import FocusTrap from './FocusTrap';

function Wrapper({ isOpen = true }: { isOpen?: boolean }) {
    const ref = useRef(null);

    return (
        <FocusTrap ref={ref} isOpen={isOpen}>
            <div ref={ref} data-testid="trap">
                <button>first</button>
                <button>second</button>
            </div>
        </FocusTrap>
    );
}

describe('FocusTrap component', () => {
    test('focuses first element on open', () => {
        render(<Wrapper />);
        const first = screen.getByText(/first/i);
        expect(first).toHaveFocus();
    });

    test('cycles focus forward', async () => {
        render(<Wrapper />);
        const first = screen.getByText('first');
        const second = screen.getByText('second');

        await userEvent.tab();
        expect(second).toHaveFocus();
        await userEvent.tab();
        expect(first).toHaveFocus();
    });

    test('cycles focus backward with shift+tab', async () => {
        render(<Wrapper isOpen={true} />);
        const second = screen.getByText(/second/i);
        await userEvent.tab({ shift: true });
        expect(second).toHaveFocus();
    });

    test('does nothing if isOpen is false', () => {
        render(<Wrapper isOpen={false} />);
        const first = screen.getByText(/first/i);
        expect(first).not.toHaveFocus();
    });
});
