import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, InlineDecorator } from '@shared/config';
import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
    title: 'Pages/HomePage/HomePage',
    component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

const session = {
    user: {
        name: 'Test User',
        email: 'test@gmail.com',
    },
    expires: '2099-12-31T23:59:59.999Z',
};

export const Authenticated: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(session)],
};

export const NotAuthenticated: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(null)],
};
