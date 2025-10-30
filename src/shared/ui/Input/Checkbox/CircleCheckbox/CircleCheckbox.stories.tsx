import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../../../config/storybook/BlockDecorator';
import CircleCheckbox from './CircleCheckbox';

const meta: Meta<typeof CircleCheckbox> = {
    title: 'Shared/Input/Checkbox/CircleCheckbox',
    component: CircleCheckbox,
};

export default meta;
type Story = StoryObj<typeof CircleCheckbox>;

export const Checked: Story = {
    decorators: [BlockDecorator],
    args: {
        children: 'Checked',
        state: true,
        onChange: () => {},
    },
};

export const Unchecked: Story = {
    decorators: [BlockDecorator],
    args: {
        children: 'Unchecked',
        state: false,
        onChange: () => {},
    },
};
