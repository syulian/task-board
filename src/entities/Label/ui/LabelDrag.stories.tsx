import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { LabelDragAndDropOrderContext } from '@entities/Label';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import TaskLabel from '../model/types/TaskLabel';
import LabelDrag from './LabelDrag';

const meta: Meta<typeof LabelDrag> = {
    title: 'Entities/Label/LabelDrag',
    component: LabelDrag,
};

export default meta;
type Story = StoryObj<typeof LabelDrag>;

const Template = (args: { label: TaskLabel }) => {
    const [currentOrder, setCurrentOrder] = useState<TaskLabel | null>(null);
    const [labels, setLabels] = useState<TaskLabel[]>([]);
    void labels;

    return (
        <LabelDragAndDropOrderContext
            value={{
                currentOrder: currentOrder,
                setCurrentOrder: setCurrentOrder,
                setOrders: setLabels,
            }}
        >
            <LabelDrag {...args} />
        </LabelDragAndDropOrderContext>
    );
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        label: {
            id: '68ed5a78f58a0f241c876712',
            order: 1,
            name: 'Easy',
            color: '#457b9d',
            board: '68ed5870f58a0f241c876688',
        },
    },
    render: Template,
};
