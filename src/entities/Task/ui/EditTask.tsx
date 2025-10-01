import { zodResolver } from '@hookform/resolvers/zod';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { HiMiniTag } from 'react-icons/hi2';
import { z } from 'zod';
import { SubtaskDragAndDropOrderContext } from '@entities/Task/model/context/subtaskDragAndDropOrderContext';
import { SubtaskSchema } from '@entities/Task/model/types/SubtaskSchema';
import Calendar from '@entities/Task/ui/Calendar';
import SubtaskControl from '@entities/Task/ui/SubtaskControl';
import { createStateController, getDate, getHour } from '@shared/lib';
import {
    AddInput,
    FormField,
    DropDownContainer,
    LabelEdit,
    SecondButton,
    Select,
} from '@shared/ui';
import LabelsDropDown from './LabelsDropDown';

const labels = [
    {
        name: 'Important',
        color: '#bd2424',
    },
];

const cards = [
    {
        id: '1',
        label: 'To Do',
    },
    {
        id: '2',
        label: 'Doing',
    },
];

const TaskSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Task name is too short' })
        .max(30, { message: 'Task name is too long' }),
    description: z.string().max(800, { message: 'Task description is too long' }),
});

type TaskValues = z.infer<typeof TaskSchema>;

export default function EditTask() {
    const [currentOrder, setCurrentOrder] = useState<SubtaskSchema | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: zodResolver(TaskSchema) });

    const [subtasks, setSubtasks] = useState([
        {
            id: '1',
            order: 1,
            value: 'Easy to use',
            checked: true,
        },
        {
            id: '2',
            order: 2,
            value: 'No Internet needed',
            checked: false,
        },
    ]);
    const [isOpen, setIsOpen] = useState({
        labels: false,
        calendar: false,
    });
    const [selected, setSelected] = useState({
        id: '1',
        label: 'To Do',
    });
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    return (
        <div className="flex justify-center gap-6 px-8 pb-9 w-screen max-w-3xl cursor-auto">
            <div className="flex flex-col gap-6 pr-6 border-r border-bg-neutral-lighter">
                <FormField
                    error={errors.name}
                    name="name"
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
                        <DropDownContainer
                            isOpen={isOpen.labels}
                            setIsOpen={() => setIsOpenField('labels', false)}
                            className="left-0 bottom-0"
                        >
                            <LabelsDropDown />
                        </DropDownContainer>
                    </div>
                    {labels.map(l => (
                        <LabelEdit key={l.name} name={l.name} color={l.color} onClick={() => {}} />
                    ))}
                </div>
                <span className="flex justify-between items-center w-full">
                    <b>Card List</b>
                    <Select list={cards} selected={selected} setSelected={setSelected} />
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
                <FormField
                    error={errors.description}
                    name="description"
                    register={register}
                    placeholder="Enter description..."
                    label="Description"
                />
            </div>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-1.5">
                    <b>Subtasks</b>
                    <AddInput onSubmit={() => {}} placeholder="Type here and press 'Enter'" />
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
        </div>
    );
}
