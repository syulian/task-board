import React, { ReactNode } from 'react';
import { HiMiniCheck } from 'react-icons/hi2';

interface ILabelCheckedProps {
    children: ReactNode;
    checked?: boolean;
}

export default function LabelChecked({ children, checked }: ILabelCheckedProps) {
    return (
        <>
            {children}
            {checked && <HiMiniCheck size={18} className="text-text-primary" />}
        </>
    );
}
