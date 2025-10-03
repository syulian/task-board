'use client';
import { clsx } from 'clsx';
import React from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { useSubtaskDragAndDropOrderContext } from '@entities/Task/model/context/subtaskDragAndDropOrderContext';
import { ISubtask } from '@entities/Task/model/types/ISubtask';
import { useOrderDragAndDrop } from '@shared/lib';
import { Checkbox, DefaultButton, Drag } from '@shared/ui';

interface ISubtaskControlProps {
    subtask: ISubtask;
}

export default function SubtaskControl({ subtask }: ISubtaskControlProps) {
    const { setCurrentOrder, currentOrder, setOrders } = useSubtaskDragAndDropOrderContext();

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    } = useOrderDragAndDrop(subtask, {
        currentOrder,
        setCurrentOrder,
        setOrders,
    });

    return (
        <div
            className={clsx(
                'flex items-center justify-between px-2 py-1 relative drag-target rounded-md border border-bg-neutral',
                isDragOverOrder && currentOrder && 'border-dashed border-bg-neutral-lighter',
            )}
            onDragOver={onDragOverOrder}
            onDragLeave={onDragLeaveOrder}
            onDrop={onDropOrder}
        >
            <span className="flex items-center gap-2">
                <Drag
                    onDragStart={onDragStartOrder}
                    onDragEnd={onDragEndOrder}
                    target=".drag-target"
                />
                <Checkbox key={subtask.id} onChange={() => {}} state={subtask.checked}>
                    {subtask.value}
                </Checkbox>
            </span>
            <DefaultButton onClick={() => {}}>
                <HiMiniXMark size={18} />
            </DefaultButton>
        </div>
    );
}
