import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import InlineInput from './InlineInput';

const meta: Meta<typeof InlineInput> = {
    title: 'Shared/Input/InlineInput',
    component: InlineInput,
};

export default meta;
type Story = StoryObj<typeof InlineInput>;

export const Disabled: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Inline Input',
        value: 'My Name',
        onBlur: value => Promise.resolve(void value),
    },
};

export const NonDisabled: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Inline Input',
        value: 'My Name',
        disabled: false,
        onBlur: value => Promise.resolve(void value),
    },
};
