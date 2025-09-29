'use client';
import React, { MouseEvent, ReactNode, useState } from 'react';
import { createPortal } from 'react-dom';

interface ITooltipProps {
    text: string;
    children: ReactNode;
    isExpanded?: boolean;
}

export default function Tooltip({ text, children, isExpanded = true }: ITooltipProps) {
    const [show, setShow] = useState(false);
    const [coords, setCoords] = useState({
        x: 0,
        y: 0,
    });

    const handleMouseEnter = (event: MouseEvent<HTMLDivElement>) => {
        if (isExpanded && !show) return;
        const rect = event.currentTarget.getBoundingClientRect();

        setCoords({
            x: rect.right + 8,
            y: rect.top + rect.height / 2,
        });

        setShow(true);
    };

    return (
        <div
            className="relative flex w-full"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => setShow(false)}
        >
            {children}
            {show &&
                createPortal(
                    <p
                        className="absolute -translate-y-1/2 p-2 border border-bg-neutral bg-bg-secondary text-text-primary rounded-sm text-sm text-nowrap select-none"
                        role="tooltip"
                        style={{
                            left: coords.x,
                            top: coords.y,
                        }}
                    >
                        {text}
                    </p>,
                    document.body,
                )}
        </div>
    );
}
