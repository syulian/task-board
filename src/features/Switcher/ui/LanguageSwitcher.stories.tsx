import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import LanguageSwitcher from './LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
    title: 'Features/Switcher/LanguageSwitcher',
    component: LanguageSwitcher,
};

export default meta;
type Story = StoryObj<typeof LanguageSwitcher>;

const Template = (args: { isOpen: boolean }) => (
    <div className="flex items-end h-50">
        <div className="relative">
            <LanguageSwitcher {...args} setIsOpen={() => {}} />
        </div>
    </div>
);

export const Default: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: { isOpen: true },
    render: Template,
};
