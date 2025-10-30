import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import ConfirmButton from './ConfirmButton';

const meta: Meta<typeof ConfirmButton> = {
    title: 'Shared/Button/ConfirmButton',
    component: ConfirmButton,
};

export default meta;
type Story = StoryObj<typeof ConfirmButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Confirm Button',
        children: 'Click me',
    },
};

export const Error: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Confirm Button',
        children: "Don't click me",
        error: 'Something went wrong',
    },
};
