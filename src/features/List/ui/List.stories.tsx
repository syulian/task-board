import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import {
    Task,
    TaskDragAndDropContext,
    TaskDragAndDropOrderContext,
    TasksList,
} from '@entities/Task';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import List from './List';

const meta: Meta<typeof List> = {
    title: 'Features/List/List',
    component: List,
};

export default meta;
type Story = StoryObj<typeof List>;

const Template = (args: { list: TasksList }) => {
    const [currentItem, setCurrentItem] = useState<Task | null>(null);
    const [currentGroup, setCurrentGroup] = useState<TasksList | null>(null);
    const [currentOrder, setCurrentOrder] = useState<TasksList | null>(null);
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
            <TaskDragAndDropOrderContext
                value={{
                    currentOrder: currentOrder,
                    setCurrentOrder: setCurrentOrder,
                    setOrders: setLists,
                }}
            >
                <nav>
                    <ul className="flex gap-8">
                        <List {...args} />
                    </ul>
                </nav>
            </TaskDragAndDropOrderContext>
        </TaskDragAndDropContext>
    );
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        list: {
            id: '68ed587af58a0f241c876691',
            order: 0,
            name: 'To do',
            color: '#d62828',
            board: '68ed5870f58a0f241c876688',
            items: [
                {
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
                        {
                            id: '68ed5a78f58a0f241c876712',
                            name: 'Easy',
                            color: '#457b9d',
                        },
                    ],
                },
            ],
        },
    },
    render: Template,
};
