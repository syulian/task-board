import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, InlineDecorator } from '@shared/config';
import { SESSION } from '@shared/const';
import { HomePage } from './HomePage';

const meta: Meta<typeof HomePage> = {
    title: 'Pages/HomePage/HomePage',
    component: HomePage,
};

export default meta;
type Story = StoryObj<typeof HomePage>;

export const Authenticated: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(SESSION)],
};

export const NotAuthenticated: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator, SessionDecorator(null)],
};
