import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { TaskDragAndDropContext } from '@entities/Task';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import Task from '../model/types/Task';
import TasksList from '../model/types/TasksList';
import TaskCard from './TaskCard';

const meta: Meta<typeof TaskCard> = {
    title: 'Entities/Task/TaskCard',
    component: TaskCard,
};

export default meta;
type Story = StoryObj<typeof TaskCard>;

const Template = (args: { task: Task; list: TasksList }) => {
    const [currentItem, setCurrentItem] = useState<Task | null>(null);
    const [currentGroup, setCurrentGroup] = useState<TasksList | null>(null);
    const [lists, setLists] = useState<TasksList[]>([]);
    void lists;

    return (
        <TaskDragAndDropContext
            value={{
                currentItem: currentItem,
                setCurrentItem: setCurrentItem,
                currentGroup: currentGroup,
                setCurrentGroup: setCurrentGroup,
                setGroups: setLists,
            }}
        >
            <TaskCard {...args} setIsOpen={() => {}} />
        </TaskDragAndDropContext>
    );
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        task: {
            id: '68ed5aecf58a0f241c876730',
            order: 0,
            title: 'Title',
            complete: true,
            dueDate: '2025-10-21T01:21:00.000Z',
            body: '_Lorem ipsum dolor sit amet, consectetur adipisicing elit._',
            list: '68ed587af58a0f241c876691',
            subtasks: [
                {
                    id: '68fb6fd1b21aa0928b3f34c9',
                    order: 0,
                    value: 'Subtask 1',
                    checked: false,
                },
                {
                    id: '68fb6fd1b21aa0928b3f34ca',
                    order: 1,
                    value: 'Subtask 2',
                    checked: true,
                },
            ],
            labels: [
                {
                    id: '68ed59c5f58a0f241c876705',
                    name: 'Important',
                    color: '#d62828',
                },
            ],
        },
        list: {
            id: '68ed587af58a0f241c876691',
            order: 0,
            name: 'To do',
            color: '#d62828',
            board: '68ed5870f58a0f241c876688',
            items: [],
        },
    },
    render: Template,
};
