import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import InlineDecorator from '../../../config/storybook/InlineDecorator';
import DefaultButton from './DefaultButton';

const meta: Meta<typeof DefaultButton> = {
    title: 'Shared/Button/DefaultButton',
    component: DefaultButton,
};

export default meta;
type Story = StoryObj<typeof DefaultButton>;

export const Default: Story = {
    decorators: [InlineDecorator],
    args: {
        ariaLabel: 'Default Button',
        children: <HiMiniCheck size={24} />,
    },
};
