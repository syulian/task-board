import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import LabelDropDown from './LabelDropDown';

const meta: Meta<typeof LabelDropDown> = {
    title: 'Entities/Label/LabelDropDown',
    component: LabelDropDown,
};

export default meta;
type Story = StoryObj<typeof LabelDropDown>;

export const Selected: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        labels: [
            {
                id: '68ed59c5f58a0f241c876705',
                order: 0,
                name: 'Important',
                color: '#d62828',
                board: '68ed5870f58a0f241c876688',
            },
        ],
        selected: ['68ed59c5f58a0f241c876705'],
        onChange: () => {},
    },
};

export const NotSelected: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        labels: [
            {
                id: '68ed5a78f58a0f241c876712',
                order: 1,
                name: 'Easy',
                color: '#457b9d',
                board: '68ed5870f58a0f241c876688',
            },
        ],
        selected: [],
        onChange: () => {},
    },
};
