import { Meta, StoryObj } from '@storybook/nextjs-vite';
import BlockDecorator from '../../config/storybook/BlockDecorator';
import NavButton from '../Button/NavButton/NavButton';
import Tooltip from './Tooltip';

const meta: Meta<typeof Tooltip> = {
    title: 'Shared/Tooltip/Tooltip',
    component: Tooltip,
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
    decorators: [BlockDecorator],
    args: {
        children: (
            <NavButton ariaLabel="Second Button" onClick={() => {}}>
                Hover me
            </NavButton>
        ),
        text: 'Update',
        isExpanded: false,
    },
};
