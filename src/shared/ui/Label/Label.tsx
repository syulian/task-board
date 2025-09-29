import React from 'react';

interface ILabelProps {
    name: string;
    color: string;
}

export default function Label({ name, color }: ILabelProps) {
    return (
        <p
            style={{ backgroundColor: color }}
            className="py-0.5 px-2 border border-bg-secondary rounded-sm text-sm text-text-secondary"
        >
            {name}
        </p>
    );
}
