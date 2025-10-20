import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Tooltip from './Tooltip';

describe('Tooltip component', () => {
    test('does not render tooltip initially', () => {
        render(
            <Tooltip text="children" isExpanded={false}>
                <span>children</span>
            </Tooltip>,
        );
        expect(screen.queryByRole('tooltip')).toBeNull();
    });

    test('shows tooltip on hover when isExpanded is false', () => {
        render(
            <Tooltip text="children" isExpanded={false}>
                <span>children</span>
            </Tooltip>,
        );
        const trigger = screen.getByText(/children/i);
        fireEvent.mouseEnter(trigger);
        expect(screen.getByRole('tooltip')).toHaveTextContent(/children/i);
    });

    test('does not show tooltip when isExpanded is true', () => {
        render(
            <Tooltip text="children" isExpanded={true}>
                <span>children</span>
            </Tooltip>,
        );
        const trigger = screen.getByText(/children/i);
        fireEvent.mouseEnter(trigger);
        expect(screen.queryByRole('tooltip')).toBeNull();
    });

    test('hides tooltip on mouse leave', () => {
        render(
            <Tooltip text="children" isExpanded={false}>
                <span>children</span>
            </Tooltip>,
        );

        const trigger = screen.getByText(/children/i);
        fireEvent.mouseEnter(trigger);
        expect(screen.getByRole('tooltip')).toBeInTheDocument();
        fireEvent.mouseLeave(trigger);
        expect(screen.queryByRole('tooltip')).toBeNull();
    });

    test('applies correct coordinates from getBoundingClientRect', () => {
        const rectMock = { top: 100, right: 200, height: 40, width: 40 } as DOMRect;
        jest.spyOn(HTMLElement.prototype, 'getBoundingClientRect').mockReturnValue(rectMock);

        render(
            <Tooltip text="children" isExpanded={false}>
                <span>children</span>
            </Tooltip>,
        );

        const trigger = screen.getByText(/children/i);
        fireEvent.mouseEnter(trigger);
        const tooltip = screen.getByRole('tooltip');

        expect(tooltip).toHaveStyle({
            left: `${rectMock.right + 8}px`,
            top: `${rectMock.top + rectMock.height / 2}px`,
        });
    });
});
