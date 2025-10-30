import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { ApolloDecorator, SessionDecorator, InlineDecorator } from '@shared/config';
import { BOARD_ID, MOCKS, SESSION } from '@shared/const';
import Board from './Board';

const meta: Meta<typeof Board> = {
    title: 'Widgets/Board/Board',
    component: Board,
};

export default meta;
type Story = StoryObj<typeof Board>;

export const Default: Story = {
    decorators: [ApolloDecorator(MOCKS), SessionDecorator(SESSION), InlineDecorator],
    parameters: {
        nextjs: {
            navigation: {
                segments: [['id', BOARD_ID]],
            },
        },
    },
};
