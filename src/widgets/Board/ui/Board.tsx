'use client';
import React, { useState } from 'react';
import { List } from '@features/List';
import { AddInput } from '@shared/ui';

export default function Board() {
    const [list, setList] = useState([
        {
            id: '1',
            order: 1,
            name: 'To Do',
            tasks: [
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
            tasks: [
                {
                    id: '1',
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
            {list.map(l => (
                <List list={l} key={l.id} />
            ))}
            <div className="min-w-80">
                <AddInput onChange={() => {}} placeholder="Add List" onSubmit={() => {}} />
            </div>
        </section>
    );
}
