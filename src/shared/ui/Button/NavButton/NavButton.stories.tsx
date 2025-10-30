import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import NavButton from './NavButton';

const meta: Meta<typeof NavButton> = {
    title: 'Shared/Button/NavButton',
    component: NavButton,
};

export default meta;
type Story = StoryObj<typeof NavButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Click me',
        ariaLabel: 'Nav Button',
    },
};
