import React from 'react';

interface IColorButtonProps {
    color: string;
    onClick: () => void;
    ariaLabel: string;
}

export default function ColorButton({ color, onClick, ariaLabel }: IColorButtonProps) {
    return (
        <button
            style={{ backgroundColor: color }}
            className="p-6 cursor-pointer rounded-lg border border-bg-neutral-lighter"
            onClick={onClick}
            aria-label={ariaLabel}
            type="button"
        />
    );
}
