import { useQuery } from '@apollo/client/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { HiMiniTag } from 'react-icons/hi2';
import { z } from 'zod';
import { GET_LISTS } from '@features/List';
import { GET_LABELS, ILabel, LabelDropDown } from '@entities/Label';
import {
    ISubtask,
    Calendar,
    SubtaskControl,
    SubtaskDragAndDropOrderContext,
    IList,
    ITask,
} from '@entities/Task';
import { createStateController, getDate, getHour } from '@shared/lib';
import {
    AddInput,
    FormField,
    DropDownContainer,
    LabelEdit,
    SecondButton,
    Select,
} from '@shared/ui';
import Textarea from '@shared/ui/Textarea/Textarea';

const TaskSchema = z.object({
    title: z
        .string()
        .min(4, { message: 'Task name is too short' })
        .max(30, { message: 'Task name is too long' }),
    list: z.object({
        id: z.string(),
        label: z.string(),
    }),
    description: z.string().max(800, { message: 'Task description is too long' }),
    labels: z.string().array(),
});

type TaskValues = z.infer<typeof TaskSchema>;

interface IEditTaskProps {
    list: IList;
    task?: ITask;
}

export default function EditTask({ list, task }: IEditTaskProps) {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

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

    const [currentOrder, setCurrentOrder] = useState<ISubtask | null>(null);

    const {
        watch,
        getValues,
        setValue,
        control,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(TaskSchema),
        defaultValues: {
            title: task?.title,
            list: {
                id: list.id,
                label: list.name,
            },
            labels: task?.labels || [],
        },
    });

    const taskLabels: ILabel[] = labels.filter(l => watch('labels').includes(l.id));

    const [subtasks, setSubtasks] = useState<ISubtask[]>([]);
    const [isOpen, setIsOpen] = useState({
        labels: false,
        calendar: false,
    });

    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    return (
        <form className="flex justify-center gap-6 px-8 pb-9 w-screen max-w-4xl cursor-auto">
            <div className="flex flex-col gap-8 pr-6 border-r border-bg-neutral-lighter w-1/2">
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
                                    getValues('labels').filter(id => id !== l.id),
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
                            {selectedDate
                                ? `${getDate(selectedDate)}, ${getHour(selectedDate)}`
                                : 'None'}
                        </SecondButton>
                        <DropDownContainer
                            isOpen={isOpen.calendar}
                            setIsOpen={() => setIsOpenField('calendar', false)}
                            className="left-full -bottom-48"
                        >
                            <Calendar
                                setSelectedDate={setSelectedDate}
                                selectedDate={selectedDate}
                                setIsOpen={() => setIsOpenField('calendar', false)}
                            />
                        </DropDownContainer>
                    </div>
                </span>
                <Textarea onChange={() => {}} />
            </div>
            <div className="flex flex-col gap-6 w-1/2">
                <div className="flex flex-col gap-1.5">
                    <b>Subtasks</b>
                    <AddInput onChange={() => {}} placeholder="Type here and press 'Enter'" />
                </div>
                <div className="flex flex-col gap-1">
                    <SubtaskDragAndDropOrderContext
                        value={{
                            currentOrder: currentOrder,
                            setCurrentOrder: setCurrentOrder,
                            setOrders: setSubtasks,
                        }}
                    >
                        {subtasks.map(s => (
                            <SubtaskControl key={s.id} subtask={s} />
                        ))}
                    </SubtaskDragAndDropOrderContext>
                </div>
            </div>
        </form>
    );
}
