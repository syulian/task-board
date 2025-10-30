import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import AddInput from './AddInput';

const meta: Meta<typeof AddInput> = {
    title: 'Shared/Input/AddInput',
    component: AddInput,
};

export default meta;
type Story = StoryObj<typeof AddInput>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Add Input',
        placeholder: 'Email...',
    },
};
