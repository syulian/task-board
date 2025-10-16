import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Controller, useForm, UseFormSetValue } from 'react-hook-form';
import { z } from 'zod';
import {
    ISubtask,
    SubtaskController,
    SubtaskDragAndDropOrderContext,
    Task,
    SubtaskSchema,
    TaskSchema,
} from '@entities/Task';
import { AddInput } from '@shared/ui';

type SubtaskValues = z.infer<typeof SubtaskSchema>;
type TaskValues = z.infer<typeof TaskSchema>;

interface IEditTaskProps {
    task?: Task;
    setValue: UseFormSetValue<TaskValues>;
}

export default function EditSubtasks({ task, setValue }: IEditTaskProps) {
    const { reset, control, handleSubmit } = useForm({
        resolver: zodResolver(SubtaskSchema),
        defaultValues: {
            name: '',
        },
    });

    const [currentOrder, setCurrentOrder] = useState<ISubtask | null>(null);
    const [subtasks, setSubtasks] = useState<ISubtask[]>(task?.subtasks ?? []);

    const onSubmit = (data: SubtaskValues) => {
        setSubtasks(prev => [
            ...prev,
            {
                id: (prev.length + 1).toString(),
                order: prev.length + 1,
                value: data.name,
                checked: false,
            },
        ]);

        reset();
    };

    const t = useTranslations('Main');

    useEffect(() => {
        setValue('subtasks', subtasks, { shouldDirty: true });
    }, [subtasks, setValue]);

    return (
        <div className="flex flex-col gap-6 w-2/5">
            <form className="flex flex-col gap-1.5" onSubmit={handleSubmit(onSubmit)}>
                <b>{t('subtask.title')}</b>
                <Controller
                    control={control}
                    name="name"
                    render={({ field }) => (
                        <AddInput
                            onChange={event => field.onChange(event.target.value)}
                            value={field.value}
                            placeholder={t('input.add.title')}
                            ariaLabel={t('subtask.add')}
                        />
                    )}
                />
            </form>
            <div className="flex flex-col gap-1">
                <SubtaskDragAndDropOrderContext
                    value={{
                        currentOrder: currentOrder,
                        setCurrentOrder: setCurrentOrder,
                        setOrders: setSubtasks,
                    }}
                >
                    {subtasks.map(s => (
                        <SubtaskController key={s.id} subtask={s} />
                    ))}
                </SubtaskDragAndDropOrderContext>
            </div>
        </div>
    );
}
