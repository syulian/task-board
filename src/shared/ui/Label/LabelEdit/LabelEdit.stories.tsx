import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import LabelEdit from './LabelEdit';

const meta: Meta<typeof LabelEdit> = {
    title: 'Shared/Label/LabelEdit',
    component: LabelEdit,
};

export default meta;
type Story = StoryObj<typeof LabelEdit>;

export const Red: Story = {
    decorators: [InlineDecorator],
    args: {
        name: 'Important',
        color: '#d62828',
    },
};

export const Orange: Story = {
    decorators: [InlineDecorator],
    args: {
        name: 'Intermediate',
        color: '#f77f00',
    },
};
