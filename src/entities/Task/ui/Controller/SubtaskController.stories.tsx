import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { ISubtask, SubtaskDragAndDropOrderContext } from '@entities/Task';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import SubtaskController from './SubtaskController';

const meta: Meta<typeof SubtaskController> = {
    title: 'Entities/Task/SubtaskController',
    component: SubtaskController,
};

export default meta;
type Story = StoryObj<typeof SubtaskController>;

const Template = (args: { subtask: ISubtask }) => {
    const [currentOrder, setCurrentOrder] = useState<ISubtask | null>(null);
    const [subtasks, setSubtasks] = useState<ISubtask[]>([args.subtask]);

    return (
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
    );
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        subtask: {
            id: '68fb6fd1b21aa0928b3f34c9',
            order: 0,
            value: 'imports',
            checked: false,
        },
    },
    render: Template,
};
