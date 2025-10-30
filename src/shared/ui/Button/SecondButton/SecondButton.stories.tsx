import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import SecondButton from './SecondButton';

const meta: Meta<typeof SecondButton> = {
    title: 'Shared/Button/SecondButton',
    component: SecondButton,
};

export default meta;
type Story = StoryObj<typeof SecondButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Click me',
        ariaLabel: 'Second Button',
    },
};
