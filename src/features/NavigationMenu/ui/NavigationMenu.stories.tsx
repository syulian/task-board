import { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import { Board, BoardDragAndDropContext, BoardsGroup } from '@entities/Board';
import { ApolloDecorator, InlineDecorator } from '@shared/config';
import NavigationMenu from './NavigationMenu';

const meta: Meta<typeof NavigationMenu> = {
    title: 'Features/NavigationMenu/NavigationMenu',
    component: NavigationMenu,
};

export default meta;
type Story = StoryObj<typeof NavigationMenu>;

const Template = (args: { group: BoardsGroup; isExpanded: boolean }) => {
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
            <NavigationMenu {...args} />
        </BoardDragAndDropContext>
    );
};

const group = {
    id: '68ed5948f58a0f241c8766c4',
    order: 1,
    name: 'Group',
    items: [
        {
            id: '68ed5952f58a0f241c8766ca',
            order: 0,
            name: 'My Board',
            groupId: '68ed5948f58a0f241c8766c4',
        },
    ],
};

export const Default: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        group,
        isExpanded: true,
    },
    render: Template,
};

export const Shortened: Story = {
    decorators: [ApolloDecorator([]), InlineDecorator],
    args: {
        group,
        isExpanded: false,
    },
    render: Template,
};
