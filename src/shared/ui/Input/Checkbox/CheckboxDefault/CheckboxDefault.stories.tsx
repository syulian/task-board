import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../../config/storybook/InlineDecorator';
import CheckboxDefault from './CheckboxDefault';

const meta: Meta<typeof CheckboxDefault> = {
    title: 'Shared/Input/Checkbox/CheckboxDefault',
    component: CheckboxDefault,
};

export default meta;
type Story = StoryObj<typeof CheckboxDefault>;

export const Checked: Story = {
    decorators: [InlineDecorator],

    args: {
        children: 'Checked',
        state: true,
        onChange: () => {},
    },
};

export const Unchecked: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Unchecked',
        state: false,
        onChange: () => {},
    },
};
