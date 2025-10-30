import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import Calendar from './Calendar';

const meta: Meta<typeof Calendar> = {
    title: 'Entities/Task/Calendar',
    component: Calendar,
};

export default meta;
type Story = StoryObj<typeof Calendar>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        selectedDate: new Date('Mon Oct 20 2025 10:19:21 GMT+0200'),
        setIsOpen: () => {},
        setSelectedDate: () => {},
    },
};
