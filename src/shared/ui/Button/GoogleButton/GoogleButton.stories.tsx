import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import GoogleButton from './GoogleButton';

const meta: Meta<typeof GoogleButton> = {
    title: 'Shared/Button/GoogleButton',
    component: GoogleButton,
};

export default meta;
type Story = StoryObj<typeof GoogleButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Sign in with Google',
    },
};
