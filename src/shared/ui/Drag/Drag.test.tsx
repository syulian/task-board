import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import Drag from './Drag';

describe('Drag component', () => {
    test('renders children', () => {
        const { getByText } = render(
            <Drag onDragStart={() => {}} onDragEnd={() => {}} target="li">
                children
            </Drag>,
        );
        expect(getByText(/children/i)).toBeInTheDocument();
    });

    test('calls onDragStart and sets drag image', () => {
        const handleDragStart = jest.fn();
        const handleDragEnd = jest.fn();

        render(
            <div>
                <Drag onDragStart={handleDragStart} onDragEnd={handleDragEnd} target="div">
                    children
                </Drag>
            </div>,
        );

        const span = screen.getByText(/children/i);
        const dataTransfer = {
            setDragImage: jest.fn(),
        };

        fireEvent.dragStart(span, { dataTransfer });
        expect(handleDragStart).toHaveBeenCalledTimes(1);
        expect(dataTransfer.setDragImage).toHaveBeenCalledTimes(1);
    });

    test('calls onDragEnd', () => {
        const handleDragStart = jest.fn();
        const handleDragEnd = jest.fn();

        render(
            <div>
                <Drag onDragStart={handleDragStart} onDragEnd={handleDragEnd} target="div">
                    children
                </Drag>
            </div>,
        );

        const span = screen.getByText(/children/i);

        fireEvent.dragEnd(span);
        expect(handleDragEnd).toHaveBeenCalledTimes(1);
    });
});
