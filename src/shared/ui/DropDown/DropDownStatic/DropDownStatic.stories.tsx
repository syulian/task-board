import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../../config/storybook/BlockDecorator';
import ListDropDown from '../ListDropDown/ListDropDown';
import DropDownStatic from './DropDownStatic';

const meta: Meta<typeof DropDownStatic> = {
    title: 'Shared/DropDown/DropDownStatic',
    component: DropDownStatic,
};

export default meta;
type Story = StoryObj<typeof DropDownStatic>;

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
    args: {
        children: <ListDropDown list={list} />,
        isOpen: true,
    },
};
