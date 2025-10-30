import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import AddBoardDropDown from './AddBoardDropDown';

const meta: Meta<typeof AddBoardDropDown> = {
    title: 'Entities/Board/AddBoardDropDown',
    component: AddBoardDropDown,
};

export default meta;
type Story = StoryObj<typeof AddBoardDropDown>;

const groupId = '68ed5870f58a0f241c871234';

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: { groupId },
};
