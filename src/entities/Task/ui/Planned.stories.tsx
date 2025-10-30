import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import Planned from './Planned';

const meta: Meta<typeof Planned> = {
    title: 'Entities/Task/Planned',
    component: Planned,
};

export default meta;
type Story = StoryObj<typeof Planned>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        task: {
            id: '68f0ec86caffecf2f10b9b38',
            title: 'task',
            body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, unde. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, unde.',
            dueDate: '2025-10-29T10:30:00.000Z',
            complete: true,
            board: {
                id: '68ed5870f58a0f241c876688',
                name: 'Task Board',
            },
            list: {
                id: '68ed587df58a0f241c876697',
                name: 'Doing',
            },
        },
    },
};
