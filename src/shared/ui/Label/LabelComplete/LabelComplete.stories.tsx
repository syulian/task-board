import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import LabelComplete from './LabelComplete';

const meta: Meta<typeof LabelComplete> = {
    title: 'Shared/Label/LabelComplete',
    component: LabelComplete,
};

export default meta;
type Story = StoryObj<typeof LabelComplete>;

const today = new Date();
const setDate = (days: number) => {
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() + days);
};

export const Complete: Story = {
    decorators: [InlineDecorator],
    args: {
        complete: true,
        dueDate: today,
    },
};

export const PastDue: Story = {
    decorators: [InlineDecorator],
    args: {
        dueDate: setDate(-1),
    },
};

export const DueToday: Story = {
    decorators: [InlineDecorator],
    args: {
        dueDate: today,
    },
};

export const DueTomorrow: Story = {
    decorators: [InlineDecorator],
    args: {
        dueDate: setDate(1),
    },
};

export const DueIn: Story = {
    decorators: [InlineDecorator],
    args: {
        dueDate: setDate(7),
    },
};
