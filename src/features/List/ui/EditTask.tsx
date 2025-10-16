import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import { Controller } from 'react-hook-form';
import { HiMiniCheck } from 'react-icons/hi2';
import useEditTask from '@features/List/lib/hooks/useEditTask';
import DateController from '@features/List/ui/Controller/DateController';
import LabelController from '@features/List/ui/Controller/LabelController';
import EditSubtasks from '@features/List/ui/EditSubtasks';
import { TaskLabel } from '@entities/Label';
import { TasksList, Task } from '@entities/Task';
import { createStateController } from '@shared/lib';
import { FormField, LabelEdit, Select, DefaultButton, Textarea, StopPropagation } from '@shared/ui';

interface IEditTaskProps {
    list: TasksList;
    task?: Task;
}

export default function EditTask({ list, task }: IEditTaskProps) {
    const [isOpen, setIsOpen] = useState({
        labels: false,
        calendar: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const { form, labels, lists, onSubmit } = useEditTask(list, task);
    const {
        watch,
        control,
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isDirty },
    } = form;

    const taskLabels: TaskLabel[] = labels.filter(l => watch('labels')?.includes(l.id));
    const dueDate = watch('dueDate');

    const t = useTranslations('Main');

    return (
        <div className="relative flex justify-center gap-6 px-8 pb-9 w-screen max-w-4xl cursor-auto">
            <form
                className="flex flex-col gap-8 pr-6 border-r border-bg-neutral-lighter w-3/5"
                onSubmit={handleSubmit(onSubmit)}
            >
                <FormField
                    error={errors.title}
                    name="title"
                    register={register}
                    placeholder={t('task.change.name.name')}
                    label={t('task.change.name.title')}
                />
                <StopPropagation>
                    <LabelController
                        labels={labels}
                        control={control}
                        isOpen={isOpen.labels}
                        setIsOpen={state => setIsOpenField('labels', state)}
                    >
                        {taskLabels.map(l => (
                            <LabelEdit
                                key={l.id}
                                name={l.name}
                                color={l.color}
                                onClick={() =>
                                    setValue(
                                        'labels',
                                        getValues('labels')?.filter(id => id !== l.id),
                                        { shouldDirty: true },
                                    )
                                }
                            />
                        ))}
                    </LabelController>
                </StopPropagation>
                <div className="flex justify-between items-center w-full">
                    <b>{t('task.change.list.title')}</b>
                    <Controller
                        name="list"
                        control={control}
                        render={({ field }) => (
                            <Select
                                list={lists}
                                selected={field.value}
                                setSelected={field.onChange}
                                ariaLabel={t('task.change.list.name')}
                            />
                        )}
                    />
                </div>
                <DateController
                    dueDate={dueDate}
                    control={control}
                    isOpen={isOpen.calendar}
                    setIsOpen={state => setIsOpenField('calendar', state)}
                />
                <Textarea
                    error={errors.body}
                    name="body"
                    register={register}
                    placeholder={t('task.change.description.name')}
                    ariaLabel={t('task.change.description.title')}
                />
                {isDirty && (
                    <DefaultButton
                        type="submit"
                        className="absolute bottom-0 right-0"
                        ariaLabel={t('task.update')}
                    >
                        <HiMiniCheck size={24} />
                    </DefaultButton>
                )}
            </form>
            <EditSubtasks task={task} setValue={setValue} />
        </div>
    );
}
