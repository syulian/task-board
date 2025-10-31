import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, InlineDecorator } from '@shared/config';
import { SESSION } from '@shared/const';
import Auth from './Auth';

const meta: Meta<typeof Auth> = {
    title: 'Features/Auth/Auth',
    component: Auth,
};

export default meta;
type Story = StoryObj<typeof Auth>;

export const AuthenticatedDefault: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(SESSION)],
    args: { isExpanded: true },
};

export const AuthenticatedShortened: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(SESSION)],
    args: { isExpanded: false },
};

export const NotAuthenticatedDefault: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(null)],
    args: { isExpanded: true },
};

export const NotAuthenticatedShortened: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(null)],
    args: { isExpanded: false },
};
