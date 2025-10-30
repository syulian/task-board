import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import EditSubtasks from './EditSubtasks';

const meta: Meta<typeof EditSubtasks> = {
    title: 'Features/List/EditSubtasks',
    component: EditSubtasks,
};

export default meta;
type Story = StoryObj<typeof EditSubtasks>;

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
            labels: [],
        },
        setValue: () => {},
    },
};
