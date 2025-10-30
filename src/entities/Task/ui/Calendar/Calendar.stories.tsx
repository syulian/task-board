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
        selectedDate: new Date(),
        setIsOpen: () => {},
        setSelectedDate: () => {},
    },
};
