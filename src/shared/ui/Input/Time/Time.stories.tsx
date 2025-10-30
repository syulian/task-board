import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import Time from './Time';

const meta: Meta<typeof Time> = {
    title: 'Shared/Input/Time',
    component: Time,
};

export default meta;
type Story = StoryObj<typeof Time>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        hours: 12,
        minutes: 30,
    },
};
