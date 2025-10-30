import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import ColorsDropDown from './ColorsDropDown';

const meta: Meta<typeof ColorsDropDown> = {
    title: 'Entities/Label/ColorsDropDown',
    component: ColorsDropDown,
};

export default meta;
type Story = StoryObj<typeof ColorsDropDown>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        onClick: color => void color,
    },
};
