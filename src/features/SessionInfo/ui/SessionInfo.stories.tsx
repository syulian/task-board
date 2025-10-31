import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator, SessionDecorator } from '@shared/config';
import { SESSION } from '@shared/const';
import SessionInfo from './SessionInfo';

const meta: Meta<typeof SessionInfo> = {
    title: 'Features/SessionInfo/SessionInfo',
    component: SessionInfo,
};

export default meta;
type Story = StoryObj<typeof SessionInfo>;

export const Authenticated: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator, SessionDecorator(SESSION)],
};

export const NotAuthenticated: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator, SessionDecorator(null)],
};
