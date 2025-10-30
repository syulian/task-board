import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../config/storybook/BlockDecorator';
import Popup from './Popup';

const meta: Meta<typeof Popup> = {
    title: 'Shared/Popup/Popup',
    component: Popup,
};

export default meta;
type Story = StoryObj<typeof Popup>;

export const Default: Story = {
    decorators: [BlockDecorator],
    args: {
        children: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Non quas, quisquam.',
        isOpen: true,
        storyMode: false,
    },
};
