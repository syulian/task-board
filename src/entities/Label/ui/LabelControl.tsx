'use client';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { LabelSchema, useLabelDragAndDropOrderContext } from '@entities/Label';
import { useOrderDragAndDrop } from '@shared/lib';
import {
    AddInput,
    ColorButton,
    DefaultButton,
    Drag,
    DropDownColor,
    DropDownContainer,
} from '@shared/ui';

interface ISearchInputProps {
    label: LabelSchema;
}

export default function LabelControl({ label }: ISearchInputProps) {
    const [isOpen, setIsOpen] = useState(false);
    const { setCurrentOrder, currentOrder, setOrders } = useLabelDragAndDropOrderContext();

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    } = useOrderDragAndDrop(label, {
        currentOrder,
        setCurrentOrder,
        setOrders,
    });

    return (
        <div
            className={clsx(
                'flex items-center gap-2 px-4 py-1 relative drag-target rounded-md border border-surface-light',
                isDragOverOrder && currentOrder && 'border-dashed border-surface-lighter',
            )}
            onDragOver={onDragOverOrder}
            onDragLeave={onDragLeaveOrder}
            onDrop={onDropOrder}
        >
            <Drag onDragStart={onDragStartOrder} onDragEnd={onDragEndOrder} target=".drag-target" />
            <div className="relative">
                <ColorButton color={label.color} onClick={() => setIsOpen(true)} />
                <DropDownContainer
                    isOpen={isOpen}
                    setIsOpen={() => setIsOpen(false)}
                    className="left-0 top-full"
                >
                    <DropDownColor />
                </DropDownContainer>
            </div>
            <AddInput
                value={label.name}
                onSubmit={() => {}}
                placeholder="Type here and press 'Enter'"
            />
            <DefaultButton onClick={() => {}}>
                <HiMiniXMark size={24} />
            </DefaultButton>
        </div>
    );
}
