import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../config/storybook/BlockDecorator';
import Select from './Select';

const meta: Meta<typeof Select> = {
    title: 'Shared/Select/Select',
    component: Select,
};

export default meta;
type Story = StoryObj<typeof Select>;

const list = [
    { id: '1', label: 'Button 1' },
    { id: '2', label: 'Button 2' },
];

export const Default: Story = {
    decorators: [BlockDecorator],
    args: {
        ariaLabel: 'Select',
        list: list,
        selected: list[0],
    },
};
