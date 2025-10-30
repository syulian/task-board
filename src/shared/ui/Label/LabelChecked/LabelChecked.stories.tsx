import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import LabelChecked from './LabelChecked';

const meta: Meta<typeof LabelChecked> = {
    title: 'Shared/Label/LabelChecked',
    component: LabelChecked,
};

export default meta;
type Story = StoryObj<typeof LabelChecked>;

export const Checked: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Label',
        checked: true,
    },
};

export const Unchecked: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Label',
        checked: false,
    },
};
