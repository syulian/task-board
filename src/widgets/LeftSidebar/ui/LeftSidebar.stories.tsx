import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, InlineDecorator } from '@shared/config';
import LeftSidebar from './LeftSidebar';

const meta: Meta<typeof LeftSidebar> = {
    title: 'Widgets/LeftSidebar/LeftSidebar',
    component: LeftSidebar,
};

export default meta;
type Story = StoryObj<typeof LeftSidebar>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), SessionDecorator(null), InlineDecorator],
};
