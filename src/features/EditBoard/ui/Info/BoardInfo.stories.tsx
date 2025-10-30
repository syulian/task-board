import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import BoardInfo from './BoardInfo';

const meta: Meta<typeof BoardInfo> = {
    title: 'Features/EditBoard/BoardInfo',
    component: BoardInfo,
};

export default meta;
type Story = StoryObj<typeof BoardInfo>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
};
