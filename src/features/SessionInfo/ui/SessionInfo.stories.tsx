import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator, SessionDecorator } from '@shared/config';
import SessionInfo from './SessionInfo';

const meta: Meta<typeof SessionInfo> = {
    title: 'Features/SessionInfo/SessionInfo',
    component: SessionInfo,
};

export default meta;
type Story = StoryObj<typeof SessionInfo>;

const session = {
    user: {
        name: 'Test User',
        email: 'test@gmail.com',
    },
    expires: '2099-12-31T23:59:59.999Z',
};

export const Authenticated: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator, SessionDecorator(session)],
};

export const NotAuthenticated: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator, SessionDecorator(null)],
};
