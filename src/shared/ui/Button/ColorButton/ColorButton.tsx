import React from 'react';

interface IColorButtonProps {
    color: string;
    onClick: () => void;
}

export default function ColorButton({ color, onClick }: IColorButtonProps) {
    return (
        <button
            style={{ backgroundColor: color }}
            className="p-6 cursor-pointer rounded-lg border border-bg-neutral-lighter"
            onClick={onClick}
        />
    );
}
