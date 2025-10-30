import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import SignInPopup from './SignInPopup';

const meta: Meta<typeof SignInPopup> = {
    title: 'Entities/User/SignInPopup',
    component: SignInPopup,
};

export default meta;
type Story = StoryObj<typeof SignInPopup>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {},
};
