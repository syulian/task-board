import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../../config/storybook/BlockDecorator';
import ListDropDown from '../ListDropDown/ListDropDown';
import DropDownDynamic from './DropDownDynamic';

const meta: Meta<typeof DropDownDynamic> = {
    title: 'Shared/DropDown/DropDownDynamic',
    component: DropDownDynamic,
};

export default meta;
type Story = StoryObj<typeof DropDownDynamic>;

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
        coordinates: {
            x: 0,
            y: 0,
        },
    },
};
