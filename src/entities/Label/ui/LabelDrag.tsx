'use client';
import { useMutation } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { clsx } from 'clsx';
import React from 'react';
import { useForm } from 'react-hook-form';
import { HiMiniCheck, HiMiniXMark } from 'react-icons/hi2';
import { z } from 'zod';
import { UPDATE_LABEL } from '@entities/Label/api/updateLabel';
import useDeleteLabel from '@entities/Label/lib/hooks/useDeleteLabel';
import useLabelDragAndDrop from '@entities/Label/lib/hooks/useLabelDragAndDrop';
import ILabel from '@entities/Label/model/types/ILabel';
import LabelSchema from '@entities/Label/model/types/LabelSchema';
import LabelController from '@entities/Label/ui/LabelController';
import { DefaultButton, Drag } from '@shared/ui';

interface ILabelsListProps {
    label: ILabel;
}

type LabelValues = z.infer<typeof LabelSchema>;

export default function LabelDrag({ label }: ILabelsListProps) {
    const { deleteLabel } = useDeleteLabel();
    const [updateLabel, { loading: updateLabelLoading }] = useMutation(UPDATE_LABEL);

    const { control, handleSubmit, formState, reset } = useForm({
        resolver: zodResolver(LabelSchema),
        defaultValues: { color: label.color, name: label.name },
    });

    const handleUpdate = async (data: LabelValues) => {
        if (updateLabelLoading) return;
        await updateLabel({
            variables: { id: label.id, name: data.name, color: data.color },
        });

        reset({ name: data.name, color: data.color });
    };

    const handleDelete = async () => {
        await deleteLabel({
            variables: {
                id: label.id,
            },
        });
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
                <DefaultButton type="submit">
                    <HiMiniCheck size={24} />
                </DefaultButton>
            ) : (
                <DefaultButton onClick={handleDelete}>
                    <HiMiniXMark size={24} />
                </DefaultButton>
            )}
        </form>
    );
}
