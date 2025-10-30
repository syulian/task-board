import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { Board, BoardDragAndDropContext, BoardsGroup } from '@entities/Board';
import { ApolloDecorator, InlineDecorator, StoreDecorator } from '@shared/config';
import { MOCKS } from '@shared/const';
import RightSidebar from './RightSidebar';

const meta: Meta<typeof RightSidebar> = {
    title: 'Features/RightSidebar/RightSidebar',
    component: RightSidebar,
};

export default meta;
type Story = StoryObj<typeof RightSidebar>;

const Template = () => {
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
            <RightSidebar />
        </BoardDragAndDropContext>
    );
};

export const Default: Story = {
    decorators: [
        ApolloDecorator(MOCKS),
        InlineDecorator,
        StoreDecorator({
            rightSidebar: {
                isExpanded: true,
            },
        }),
    ],
    render: Template,
};
