import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import AddButton from './AddButton';

const meta: Meta<typeof AddButton> = {
    title: 'Shared/Button/AddButton',
    component: AddButton,
};

export default meta;
type Story = StoryObj<typeof AddButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Add Button',
    },
};
