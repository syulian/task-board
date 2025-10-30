import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import AddGroupDropDown from './AddGroupDropDown';

const meta: Meta<typeof AddGroupDropDown> = {
    title: 'Entities/Board/AddGroupDropDown',
    component: AddGroupDropDown,
};

export default meta;
type Story = StoryObj<typeof AddGroupDropDown>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
};
