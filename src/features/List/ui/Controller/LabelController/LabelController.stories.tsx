import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskLabel } from '@entities/Label';
import { TaskSchema } from '@entities/Task';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import LabelController from './LabelController';

const meta: Meta<typeof LabelController> = {
    title: 'Features/List/LabelController',
    component: LabelController,
};

export default meta;
type Story = StoryObj<typeof LabelController>;

type TaskValues = z.infer<typeof TaskSchema>;

const Template = (args: { labels: TaskLabel[]; isOpen: boolean; children: ReactNode }) => {
    const { control } = useForm<TaskValues>({
        defaultValues: {
            labels: [args.labels[0].id],
        },
    });

    return (
        <div className="relative">
            <LabelController {...args} control={control} setIsOpen={() => {}} />
        </div>
    );
};

const labels = [
    {
        id: '68ed59c5f58a0f241c876705',
        order: 0,
        name: 'Important',
        color: '#d62828',
        board: '68ed5870f58a0f241c876688',
    },
    {
        id: '68ed5a78f58a0f241c876712',
        order: 1,
        name: 'Easy',
        color: '#457b9d',
        board: '68ed5870f58a0f241c876688',
    },
];

export const Closed: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: {
        isOpen: false,
        labels,
    },
    render: Template,
};

export const Open: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: {
        isOpen: true,
        labels,
    },
    render: Template,
};
