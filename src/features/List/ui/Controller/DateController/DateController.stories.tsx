import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TaskSchema } from '@entities/Task';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import DateController from './DateController';

const meta: Meta<typeof DateController> = {
    title: 'Features/List/DateController',
    component: DateController,
};

export default meta;
type Story = StoryObj<typeof DateController>;

type TaskValues = z.infer<typeof TaskSchema>;

const Template = (args: { dueDate: Date | null; isOpen: boolean }) => {
    const { control } = useForm<TaskValues>({
        defaultValues: {
            dueDate: args.dueDate,
        },
    });

    return <DateController {...args} control={control} setIsOpen={() => {}} />;
};

export const Closed: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: {
        isOpen: false,
        dueDate: new Date(),
    },
    render: Template,
};

export const Open: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: {
        isOpen: true,
        dueDate: new Date(),
    },
    render: Template,
};
