'use client';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { HiMiniXMark } from 'react-icons/hi2';
import { useSubtaskDragAndDropOrderContext } from '@entities/Task/model/context/subtaskDragAndDropOrderContext';
import { ISubtask } from '@entities/Task/model/types/ISubtask';
import { useOrderDragAndDrop } from '@shared/lib';
import { CheckboxDefault, DefaultButton, Drag } from '@shared/ui';

interface ISubtaskControllerProps {
    subtask: ISubtask;
}

export default function SubtaskController({ subtask }: ISubtaskControllerProps) {
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

    const t = useTranslations('Main');

    const handleUpdate = () => {
        setOrders(prev => {
            const newSubtasks = [...prev];
            const index = newSubtasks.findIndex(s => s.id === subtask.id);

            if (index < 0) return prev;

            newSubtasks[index] = {
                ...newSubtasks[index],
                checked: !newSubtasks[index].checked,
            };

            return newSubtasks;
        });
    };

    const handleDelete = () => {
        setOrders(prev => prev.filter(s => s.id !== subtask.id));
    };

    return (
        <div
            className={clsx(
                'flex items-center justify-between px-2 py-1 relative drag-target rounded-md border-dashed border',
                isDragOverOrder && currentOrder
                    ? 'border-bg-neutral-lighter'
                    : 'border-transparent',
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
                <CheckboxDefault key={subtask.id} onChange={handleUpdate} state={subtask.checked}>
                    {subtask.value}
                </CheckboxDefault>
            </span>
            <DefaultButton onClick={handleDelete} ariaLabel={t('subtask.delete')}>
                <HiMiniXMark size={18} />
            </DefaultButton>
        </div>
    );
}
