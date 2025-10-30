import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import SearchInput from './SearchInput';

const meta: Meta<typeof SearchInput> = {
    title: 'Features/SearchInput/SearchInput',
    component: SearchInput,
};

export default meta;
type Story = StoryObj<typeof SearchInput>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
};
