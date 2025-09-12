'use client';
import React, { useState } from 'react';
import { List } from '@features/List';
import {
    TaskSchema,
    TasksGroupSchema,
    TaskDragAndDropContext,
    TaskDragAndDropOrderContext,
} from '@entities/Task';
import { AddInput } from '@shared/ui';

export default function Board() {
    const [currentItem, setCurrentItem] = useState<TaskSchema | null>(null);
    const [currentGroup, setCurrentGroup] = useState<TasksGroupSchema | null>(null);
    const [currentOrder, setCurrentOrder] = useState<TasksGroupSchema | null>(null);

    const [list, setList] = useState([
        {
            id: '1',
            order: 1,
            name: 'To Do',
            items: [
                {
                    id: '1',
                    order: 1,
                    title: 'Website creation',
                    body: '*Need to create a new task! Need to create a new task!* \n\n *Need to create a new task! Need to create a new task!*',
                    attachments: [
                        {
                            type: 'checkbox',
                            value: 'Easy to use',
                            checked: true,
                        },
                        {
                            type: 'checkbox',
                            value: 'No Internet needed',
                            checked: false,
                        },
                    ],
                    labels: [
                        {
                            name: 'Important',
                            color: '#bd2424',
                        },
                    ],
                },
                {
                    id: '2',
                    order: 2,
                    title: 'Website creation',
                    body: '*Need to create a new task! Need to create a new task!*',
                    labels: [
                        {
                            name: 'Nice',
                            color: '#3ea9bc',
                        },
                    ],
                },
            ],
        },
        {
            id: '2',
            order: 2,
            name: 'Doing',
            items: [
                {
                    id: '3',
                    order: 1,
                    title: 'Website testing',
                    body: '*Need to create a new task! Need to create a new task!*',
                    labels: [
                        {
                            name: 'Nice',
                            color: '#3ea9bc',
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <section className="w-full flex gap-8 overflow-x-scroll pb-4">
            <TaskDragAndDropContext
                value={{
                    currentItem: currentItem,
                    setCurrentItem: setCurrentItem,
                    currentGroup: currentGroup,
                    setCurrentGroup: setCurrentGroup,
                    setGroups: setList,
                }}
            >
                <TaskDragAndDropOrderContext
                    value={{
                        currentOrder: currentOrder,
                        setCurrentOrder: setCurrentOrder,
                        setOrders: setList,
                    }}
                >
                    <nav>
                        <ul className="flex gap-8">
                            {list.map(l => (
                                <List list={l} key={l.id} />
                            ))}
                        </ul>
                    </nav>
                </TaskDragAndDropOrderContext>
            </TaskDragAndDropContext>
            <div className="min-w-80">
                <AddInput placeholder="Add List" onSubmit={() => {}} />
            </div>
        </section>
    );
}
