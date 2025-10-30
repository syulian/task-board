import { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useState } from 'react';
import { BoardDragAndDropContext } from '@entities/Board';
import { ApolloDecorator, BlockDecorator } from '@shared/config';
import Board from '../model/types/Board';
import BoardsGroup from '../model/types/BoardsGroup';
import BoardLink from './BoardLink';

const meta: Meta<typeof BoardLink> = {
    title: 'Entities/Board/BoardLink',
    component: BoardLink,
};

export default meta;
type Story = StoryObj<typeof BoardLink>;

const Template = (args: { group: BoardsGroup; board: Board; isExpanded: boolean }) => {
    const [currentItem, setCurrentItem] = useState<Board | null>(null);
    const [currentGroup, setCurrentGroup] = useState<BoardsGroup | null>(null);
    const [groups, setGroups] = useState<BoardsGroup[]>([]);
    void groups;

    return (
        <BoardDragAndDropContext
            value={{
                currentItem: currentItem,
                setCurrentItem: setCurrentItem,
                currentGroup: currentGroup,
                setCurrentGroup: setCurrentGroup,
                setGroups: setGroups,
            }}
        >
            <BoardLink {...args} />
        </BoardDragAndDropContext>
    );
};

const args = {
    group: {
        id: '68ed5948f58a0f241c8766c4',
        order: 1,
        name: 'Backend',
        items: [
            {
                id: '68ed5952f58a0f241c8766ca',
                order: 0,
                name: 'My Board',
                groupId: '68ed5948f58a0f241c8766c4',
            },
        ],
    },
    board: {
        id: '68ed5952f58a0f241c8766ca',
        order: 0,
        name: 'My Board',
        groupId: '68ed5948f58a0f241c8766c4',
    },
    isExpanded: true,
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args,
    render: Template,
};

export const Shortened: Story = {
    decorators: [ApolloDecorator([]), BlockDecorator],
    args: {
        ...args,
        isExpanded: false,
    },
    render: Template,
};
