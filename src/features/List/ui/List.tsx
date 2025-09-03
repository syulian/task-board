import React from 'react';
import { HiEllipsisHorizontal, HiMiniPlus } from 'react-icons/hi2';
import { TaskCard } from '@entities/Task';
import { DefaultButton, AddButton } from '@shared/ui';

export default function List() {
    const tasks = [
        {
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
                    name: 'Web',
                    color: '#87b172',
                },
                {
                    name: 'Nice',
                    color: '#3ea9bc',
                },
                {
                    name: 'Important',
                    color: '#bd2424',
                },
                {
                    name: 'Handy',
                    color: '#d8be39',
                },
            ],
        },
        {
            title: 'Website creation',
            body: '*Need to create a new task! Need to create a new task!*',
            labels: [
                {
                    name: 'Nice',
                    color: '#3ea9bc',
                },
                {
                    name: 'Important',
                    color: '#bd2424',
                },
                {
                    name: 'Handy',
                    color: '#d8be39',
                },
            ],
        },
    ];

    return (
        <nav>
            <ul className="flex gap-8">
                {Array.from({ length: 3 }).map((_, i) => (
                    <li
                        key={i}
                        className="flex flex-col border-surface-light border rounded-sm w-80 h-[calc(100vh-124px)] p-4 relative"
                    >
                        <div className="flex items-center justify-between pb-2 px-2 border-b-2 border-red-900 rounded-b-xs">
                            <span className="flex items-end font-bold">
                                <p className="text-2xl text-surface-lighter">⣿</p>
                                <p>To Do</p>
                            </span>
                            <span className="flex">
                                <DefaultButton onClick={() => {}}>
                                    <HiMiniPlus size={24} />
                                </DefaultButton>
                                <DefaultButton onClick={() => {}}>
                                    <HiEllipsisHorizontal size={24} />
                                </DefaultButton>
                            </span>
                        </div>
                        <div className="overflow-y-scroll">
                            {tasks.map((t, i) => (
                                <TaskCard key={i} task={t} />
                            ))}
                        </div>
                        <AddButton onClick={() => {}} />
                    </li>
                ))}
            </ul>
        </nav>
    );
}
