import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import ThemeSwitcher from './ThemeSwitcher';

const meta: Meta<typeof ThemeSwitcher> = {
    title: 'Features/Switcher/ThemeSwitcher',
    component: ThemeSwitcher,
};

export default meta;
type Story = StoryObj<typeof ThemeSwitcher>;

const Template = (args: { isOpen: boolean }) => (
    <div className="flex items-end h-50">
        <div className="relative">
            <ThemeSwitcher {...args} setIsOpen={() => {}} />
        </div>
    </div>
);

export const Default: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: { isOpen: true },
    render: Template,
};
