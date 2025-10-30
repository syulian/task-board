import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import EditBoard from './EditBoard';

const meta: Meta<typeof EditBoard> = {
    title: 'Features/EditBoard/EditBoard',
    component: EditBoard,
};

export default meta;
type Story = StoryObj<typeof EditBoard>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
};
