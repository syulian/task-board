import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator, SessionDecorator } from '@shared/config';
import Settings from './Settings';

const meta: Meta<typeof Settings> = {
    title: 'Widgets/LeftSidebar/Settings',
    component: Settings,
};

export default meta;
type Story = StoryObj<typeof Settings>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), SessionDecorator(null), BlockDecorator],
};
