import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import SignUpPopup from './SignUpPopup';

const meta: Meta<typeof SignUpPopup> = {
    title: 'Entities/User/SignUpPopup',
    component: SignUpPopup,
};

export default meta;
type Story = StoryObj<typeof SignUpPopup>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {},
};
