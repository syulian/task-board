import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Suspense } from 'react';
import { ApolloDecorator, SessionDecorator, StoreDecorator, InlineDecorator } from '@shared/config';
import { BOARD_ID, MOCKS, SESSION } from '@shared/const';
import { BoardPage } from './BoardPage';

const meta: Meta<typeof BoardPage> = {
    title: 'Pages/BoardPage/BoardPage',
    component: BoardPage,
};

export default meta;
type Story = StoryObj<typeof BoardPage>;

const Template = () => {
    return (
        <Suspense fallback="">
            <BoardPage />
        </Suspense>
    );
};

export const Default: Story = {
    decorators: [
        ApolloDecorator(MOCKS),
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
    render: Template,
};
