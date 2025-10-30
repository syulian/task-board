import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../../config/storybook/BlockDecorator';
import ListDropDown from './ListDropDown';

const meta: Meta<typeof ListDropDown> = {
    title: 'Shared/DropDown/ListDropDown',
    component: ListDropDown,
};

export default meta;
type Story = StoryObj<typeof ListDropDown>;

const list = [
    {
        children: [
            {
                label: 'Update',
                onClick: () => {},
            },
            {
                label: 'Delete',
                onClick: () => {},
            },
        ],
    },
];

export const Default: Story = {
    decorators: [BlockDecorator],
    args: { list },
};
