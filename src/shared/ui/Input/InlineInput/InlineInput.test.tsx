import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import InlineInput from './InlineInput';

describe('InlineInput component', () => {
    test('renders with initial value', () => {
        render(<InlineInput value="test" ariaLabel="inline-input" onBlur={jest.fn()} />);
        const input = screen.getByLabelText('inline-input');
        expect(input).toHaveValue('test');
    });

    test('focuses and selects when enabled', () => {
        render(
            <InlineInput
                value="hello"
                disabled={false}
                ariaLabel="inline-input"
                onBlur={jest.fn()}
            />,
        );
        const input = screen.getByLabelText<HTMLInputElement>('inline-input');
        expect(input).toHaveFocus();
        expect(input.selectionStart).toBe(0);
        expect(input.selectionEnd).toBe(input.value.length);
    });

    test('onBlur is called with current value', () => {
        const handleBlur = jest.fn();

        render(
            <InlineInput
                value="init"
                disabled={false}
                ariaLabel="inline-input"
                onBlur={handleBlur}
            />,
        );

        const input = screen.getByLabelText('inline-input');
        fireEvent.change(input, { target: { value: 'updated' } });
        fireEvent.blur(input);

        expect(handleBlur).toHaveBeenCalledWith('updated');
    });

    test('disabled input does not focus automatically', () => {
        render(
            <InlineInput
                value="no-focus"
                disabled={true}
                ariaLabel="inline-input"
                onBlur={jest.fn()}
            />,
        );
        const input = screen.getByLabelText('inline-input');
        expect(input).not.toHaveFocus();
    });
});
