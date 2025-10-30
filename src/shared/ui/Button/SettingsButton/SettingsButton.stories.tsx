import { Meta, StoryObj } from '@storybook/nextjs-vite';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import SettingsButton from './SettingsButton';

const meta: Meta<typeof SettingsButton> = {
    title: 'Shared/Button/SettingsButton',
    component: SettingsButton,
};

export default meta;
type Story = StoryObj<typeof SettingsButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        children: 'Click me',
        ariaLabel: 'Settings Button',
    },
};
