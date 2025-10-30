import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import LabelPopup from './LabelPopup';

const meta: Meta<typeof LabelPopup> = {
    title: 'Entities/Label/LabelPopup',
    component: LabelPopup,
};

export default meta;
type Story = StoryObj<typeof LabelPopup>;

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
};
