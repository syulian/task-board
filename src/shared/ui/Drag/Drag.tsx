import React, { DragEvent, ReactNode } from 'react';

interface IDragProps {
    onDragStart: (event: DragEvent<HTMLElement>) => void;
    onDragEnd: (event: DragEvent<HTMLElement>) => void;
    target: string;
    children?: ReactNode;
}

export default function Drag({ onDragStart, onDragEnd, target, children }: IDragProps) {
    return (
        <span
            className="flex items-center font-bold cursor-grab"
            draggable
            onDragStart={e => {
                onDragStart(e);

                const li = e.currentTarget.closest(target);
                if (li) e.dataTransfer.setDragImage(li, 0, 0);
            }}
            onDragEnd={onDragEnd}
        >
            <p className="text-3xl text-surface-lighter w-6 ">⋮⋮</p>
            {children}
        </span>
    );
}
