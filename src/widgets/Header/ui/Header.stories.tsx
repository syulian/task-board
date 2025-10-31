import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, StoreDecorator, InlineDecorator } from '@shared/config';
import { BOARD_ID, SESSION } from '@shared/const';
import Header from './Header';

const meta: Meta<typeof Header> = {
    title: 'Widgets/Header/Header',
    component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

export const Default: Story = {
    decorators: [
        ApolloDecorator([]),
        SessionDecorator(SESSION),
        StoreDecorator({
            rightSidebar: {
                isExpanded: false,
            },
        }),
        InlineDecorator,
    ],
    parameters: {
        nextjs: {
            navigation: {
                segments: [['id', BOARD_ID]],
            },
        },
    },
};
