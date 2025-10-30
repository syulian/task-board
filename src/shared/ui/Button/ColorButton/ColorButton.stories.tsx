import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import ColorButton from './ColorButton';

const meta: Meta<typeof ColorButton> = {
    title: 'Shared/Button/ColorButton',
    component: ColorButton,
};

export default meta;
type Story = StoryObj<typeof ColorButton>;

export const Red: Story = {
    decorators: [InlineDecorator],
    args: {
        color: '#d62828',
        ariaLabel: 'Red',
    },
};

export const Yellow = {
    decorators: [InlineDecorator],
    args: {
        color: '#fcbf49',
        ariaLabel: 'Yellow',
    },
};
