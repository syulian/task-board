import { useMutation, useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiMiniCheck, HiMiniTag } from 'react-icons/hi2';
import { z } from 'zod';
import { GET_LISTS } from '@features/List';
import EditSubtasks from '@features/List/ui/EditSubtasks';
import { GET_LABELS, ILabel, LabelDropDown } from '@entities/Label';
import { Calendar, CREATE_TASK, IList, ITask, TaskSchema, UPDATE_TASK } from '@entities/Task';
import { createStateController, getDate, getHour } from '@shared/lib';
import {
    FormField,
    DropDownContainer,
    LabelEdit,
    SecondButton,
    Select,
    DefaultButton,
} from '@shared/ui';
import Textarea from '@shared/ui/Textarea/Textarea';

type TaskValues = z.infer<typeof TaskSchema>;

interface IEditTaskProps {
    list: IList;
    task?: ITask;
}

export default function EditTask({ list, task }: IEditTaskProps) {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const [createTask] = useMutation(CREATE_TASK, { refetchQueries: ['GetLists'] });
    const [updateTask] = useMutation(UPDATE_TASK);

    const { data: dataLabels } = useQuery<{ getLabels: ILabel[] }>(GET_LABELS, {
        variables: { boardId },
    });
    const { data: dataLists } = useQuery<{ getLists: IList[] }>(GET_LISTS, {
        variables: { boardId },
    });

    const labels = dataLabels?.getLabels ?? [];
    const lists =
        dataLists?.getLists.map(l => ({
            id: l.id,
            label: l.name,
        })) ?? [];

    const initialValues = {
        title: task?.title ?? '',
        dueDate: task?.dueDate ? new Date(task.dueDate) : null,
        body: task?.body ?? '',
        subtasks: task?.subtasks ?? [],
        labels: task?.labels?.map(l => l.id) ?? [],
        list: {
            id: list.id,
            label: list.name,
        },
    };

    const {
        reset,
        watch,
        control,
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(TaskSchema),
        defaultValues: initialValues,
    });

    const taskLabels: ILabel[] = labels.filter(l => watch('labels')?.includes(l.id));
    const dueDate = watch('dueDate');

    const [isOpen, setIsOpen] = useState({
        labels: false,
        calendar: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const onSubmit = async (data: TaskValues) => {
        const newTask = {
            listId: data.list.id,
            title: data.title,
            dueDate: data.dueDate,
            body: data.body,
            subtasks: data.subtasks,
            labels: data.labels,
        };

        if (!task) {
            await createTask({
                variables: { task: newTask },
            });
        } else {
            await updateTask({
                variables: {
                    task: {
                        id: task.id,
                        ...newTask,
                    },
                },
            });
        }

        reset();
    };

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
                    placeholder="Enter task name..."
                    label="Task Name"
                />
                <div className="flex flex-wrap gap-2">
                    <div className="relative">
                        <SecondButton onClick={() => setIsOpenField('labels', true)}>
                            <HiMiniTag size={18} />
                            Select Labels
                        </SecondButton>
                        <Controller
                            name="labels"
                            control={control}
                            render={({ field }) => {
                                const toggleLabel = (id: string) => {
                                    const value = field.value;
                                    if (!value) return;

                                    const newLabels = value.includes(id)
                                        ? value.filter(l => l !== id)
                                        : [...value, id];
                                    field.onChange(newLabels);
                                };

                                return (
                                    <DropDownContainer
                                        isOpen={isOpen.labels}
                                        setIsOpen={() => setIsOpenField('labels', false)}
                                        className="left-0 bottom-0"
                                    >
                                        <LabelDropDown
                                            labels={labels}
                                            selected={field.value}
                                            onChange={toggleLabel}
                                        />
                                    </DropDownContainer>
                                );
                            }}
                        />
                    </div>
                    {taskLabels.map(l => (
                        <LabelEdit
                            key={l.id}
                            name={l.name}
                            color={l.color}
                            onClick={() =>
                                setValue(
                                    'labels',
                                    getValues('labels')?.filter(id => id !== l.id),
                                )
                            }
                        />
                    ))}
                </div>
                <span className="flex justify-between items-center w-full">
                    <b>Task List</b>
                    <Controller
                        name="list"
                        control={control}
                        render={({ field }) => (
                            <Select
                                list={lists}
                                selected={field.value}
                                setSelected={field.onChange}
                            />
                        )}
                    />
                </span>
                <span className="flex justify-between items-center w-full">
                    <b>Due Date</b>
                    <div className="relative">
                        <SecondButton onClick={() => setIsOpenField('calendar', true)}>
                            {dueDate ? `${getDate(dueDate)}, ${getHour(dueDate)}` : 'None'}
                        </SecondButton>
                        <DropDownContainer
                            isOpen={isOpen.calendar}
                            setIsOpen={() => setIsOpenField('calendar', false)}
                            className="left-full -bottom-48"
                        >
                            <Controller
                                name="dueDate"
                                control={control}
                                render={({ field }) => (
                                    <Calendar
                                        setSelectedDate={newDate => field.onChange(newDate)}
                                        selectedDate={field.value}
                                        setIsOpen={() => setIsOpenField('calendar', false)}
                                    />
                                )}
                            />
                        </DropDownContainer>
                    </div>
                </span>
                <Textarea
                    error={errors.body}
                    name="body"
                    register={register}
                    placeholder="Add description..."
                />
                {isDirty && (
                    <DefaultButton type="submit" className="absolute bottom-0 right-0">
                        <HiMiniCheck size={24} />
                    </DefaultButton>
                )}
            </form>
            <EditSubtasks task={task} setValue={setValue} />
        </div>
    );
}
