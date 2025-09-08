'use client';
import React from 'react';
import { HiEllipsisHorizontal, HiMiniPlus } from 'react-icons/hi2';
import ListSchema from '@features/List/model/types/ListSchema';
import { TaskCard } from '@entities/Task';
import { DefaultButton, AddButton } from '@shared/ui';

interface IListProps {
    list: ListSchema;
}

export default function List({ list }: IListProps) {
    return (
        <nav>
            <ul className="flex gap-8">
                <li
                    key={list.id}
                    className="flex flex-col border-surface-light border rounded-sm w-80 h-[calc(100vh-124px)] p-4 relative"
                    draggable
                >
                    <div className="flex items-center justify-between pb-2 px-2 border-b-2 border-red-900 rounded-b-xs">
                        <span className="flex items-end font-bold cursor-pointer drag-handle">
                            <p className="text-2xl text-surface-lighter">⣿</p>
                            <p>{list.name}</p>
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
                        {list.tasks.map(t => (
                            <TaskCard key={t.id} task={t} />
                        ))}
                    </div>
                    <AddButton onClick={() => {}} />
                </li>
            </ul>
        </nav>
    );
}
