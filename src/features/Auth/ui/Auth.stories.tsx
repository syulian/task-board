import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, InlineDecorator } from '@shared/config';
import Auth from './Auth';

const meta: Meta<typeof Auth> = {
    title: 'Features/Auth/Auth',
    component: Auth,
};

export default meta;
type Story = StoryObj<typeof Auth>;

const session = {
    user: {
        name: 'Test User',
        email: 'test@gmail.com',
    },
    expires: '2099-12-31T23:59:59.999Z',
};

export const AuthenticatedDefault: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(session)],
    args: { isExpanded: true },
};

export const AuthenticatedShortened: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(session)],
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
