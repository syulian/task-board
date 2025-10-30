import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, StoreDecorator, InlineDecorator } from '@shared/config';
import { BOARD_ID } from '@shared/const';
import Header from './Header';

const meta: Meta<typeof Header> = {
    title: 'Widgets/Header/Header',
    component: Header,
};

export default meta;
type Story = StoryObj<typeof Header>;

const session = {
    user: {
        name: 'Test User',
        email: 'test@gmail.com',
    },
    expires: '2099-12-31T23:59:59.999Z',
};

export const Default: Story = {
    decorators: [
        ApolloDecorator([]),
        SessionDecorator(session),
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
