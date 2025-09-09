'use client';
import { clsx } from 'clsx';
import React from 'react';
import { HiEllipsisHorizontal, HiMiniPlus } from 'react-icons/hi2';
import {
    TaskCard,
    TasksGroupSchema,
    useTaskDragAndDropContext,
    useTaskDragAndDropOrderContext,
} from '@entities/Task';
import { useOrderDragAndDrop, useParentDragAndDrop } from '@shared/lib';
import { DefaultButton, AddButton } from '@shared/ui';

interface IListProps {
    list: TasksGroupSchema;
}

export default function List({ list }: IListProps) {
    const { currentItem, currentGroup, setGroups } = useTaskDragAndDropContext();
    const { setCurrentOrder, currentOrder, setOrders } = useTaskDragAndDropOrderContext();

    const { onDragOver, onDrop } = useParentDragAndDrop(list, {
        currentItem,
        setGroups,
        currentGroup,
    });

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    } = useOrderDragAndDrop(list, {
        currentOrder,
        setCurrentOrder,
        setOrders,
    });

    return (
        <nav>
            <ul className="flex gap-8">
                <li
                    key={list.id}
                    className={clsx(
                        'flex flex-col border-surface-light border rounded-sm w-80 h-[calc(100vh-124px)] p-4 relative',
                        isDragOverOrder && currentOrder && 'border-dashed border-surface-lighter',
                    )}
                    onDragOver={onDragOverOrder}
                    onDragLeave={onDragLeaveOrder}
                    onDrop={onDropOrder}
                >
                    <div className="flex items-center justify-between pb-2 px-2 border-b-2 border-red-900 rounded-b-xs">
                        <span
                            className="flex items-end font-bold cursor-pointer drag-handle"
                            draggable
                            onDragStart={e => {
                                onDragStartOrder(e);

                                const li = e.currentTarget.closest('li');
                                if (li) e.dataTransfer.setDragImage(li, 0, 0);
                            }}
                            onDragEnd={onDragEndOrder}
                        >
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
                    <div
                        className="overflow-y-scroll h-full"
                        onDragOver={onDragOver}
                        onDrop={e => {
                            onDrop(e);
                        }}
                    >
                        {list.items.map(t => (
                            <TaskCard key={t.id} task={t} list={list} />
                        ))}
                    </div>
                    <AddButton onClick={() => {}} />
                </li>
            </ul>
        </nav>
    );
}
