import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../config/storybook/InlineDecorator';
import Drag from './Drag';

const meta: Meta<typeof Drag> = {
    title: 'Shared/Drag/Drag',
    component: Drag,
};

export default meta;
type Story = StoryObj<typeof Drag>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Drag me',
    },
};
