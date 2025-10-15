'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiMiniCheck, HiMiniXMark } from 'react-icons/hi2';
import { z } from 'zod';
import useDeleteLabel from '@entities/Label/lib/hooks/useDeleteLabel';
import useLabelDragAndDrop from '@entities/Label/lib/hooks/useLabelDragAndDrop';
import LabelSchema from '@entities/Label/model/types/LabelSchema';
import TaskLabel from '@entities/Label/model/types/TaskLabel';
import LabelController from '@entities/Label/ui/Controller/LabelController';
import { useUpdateLabelMutation } from '@shared/types';
import { DefaultButton, Drag } from '@shared/ui';

interface ILabelsListProps {
    label: TaskLabel;
}

type LabelValues = z.infer<typeof LabelSchema>;

export default function LabelDrag({ label }: ILabelsListProps) {
    const { deleteLabel } = useDeleteLabel();
    const [updateLabel, { loading: updateLabelLoading }] = useUpdateLabelMutation();

    const { control, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(LabelSchema),
        defaultValues: { color: label.color, name: label.name },
    });

    const handleUpdate = async (data: LabelValues) => {
        if (updateLabelLoading) return;

        try {
            await updateLabel({
                variables: { id: label.id, name: data.name, color: data.color },
            });

            reset({ name: data.name, color: data.color });
        } catch (e) {
            console.log(e);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteLabel({
                variables: {
                    id: label.id,
                },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
        currentOrder,
    } = useLabelDragAndDrop(label);

    const t = useTranslations('Main');

    return (
        <form
            className={clsx(
                'flex items-center gap-2 px-4 py-1 relative drag-target rounded-md border border-dashed',
                isDragOverOrder && currentOrder
                    ? 'border-bg-neutral-lighter'
                    : 'border-transparent',
            )}
            onDragOver={onDragOverOrder}
            onDragLeave={onDragLeaveOrder}
            onDrop={onDropOrder}
            onSubmit={handleSubmit(handleUpdate)}
        >
            <Drag onDragStart={onDragStartOrder} onDragEnd={onDragEndOrder} target=".drag-target" />
            <LabelController control={control} />
            {formState.isDirty ? (
                <DefaultButton type="submit" ariaLabel={t('label.update')}>
                    <HiMiniCheck size={24} />
                </DefaultButton>
            ) : (
                <DefaultButton onClick={handleDelete} ariaLabel={t('label.delete')}>
                    <HiMiniXMark size={24} />
                </DefaultButton>
            )}
        </form>
    );
}
