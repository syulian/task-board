'use client';
import { clsx } from 'clsx';
import React from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { useTaskDragAndDropContext } from '@entities/Task/model/context/taskDragAndDropContext';
import { TaskSchema } from '@entities/Task/model/types/TaskSchema';
import { TasksGroupSchema } from '@entities/Task/model/types/TasksGroupSchema';
import { getDate, useDragAndDrop } from '@shared/lib';
import { Label, Checkbox } from '@shared/ui';

interface ITaskCardProps {
    task: TaskSchema;
    list: TasksGroupSchema;
}

export default function TaskCard({ task, list }: ITaskCardProps) {
    const { body, title, labels, subtasks, complete, dueDate } = task;

    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } =
        useTaskDragAndDropContext();
    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop } = useDragAndDrop(
        list,
        task,
        {
            currentItem,
            setGroups,
            setCurrentItem,
            setCurrentGroup,
            currentGroup,
        },
    );

    return (
        <div
            className={clsx(
                'flex flex-col gap-2 border border-surface-dark rounded-sm bg-surface-light p-2 mt-2 cursor-pointer relative',
                isDragOver && currentItem && 'border-dashed border-surface-lighter',
            )}
            draggable
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
        >
            {(complete || dueDate) && (
                <p
                    className={clsx(
                        'absolute top-0 right-4 py-1 px-2 bg-background-dark rounded-b-sm font-semibold text-sm border-b border-l border-r border-surface-dark opacity-80',
                        complete
                            ? 'bg-green-800'
                            : dueDate && (dueDate >= new Date() ? 'text-blue-400' : 'text-red-400'),
                    )}
                >
                    {complete ? 'Complete' : dueDate && getDate(dueDate)}
                </p>
            )}
            <p className="font-semibold">{title}</p>
            <div className="text-sm text-gray-400">
                <Markdown>{body}</Markdown>
                {subtasks && (
                    <>
                        <span className="flex gap-2 items-center py-2">
                            <HiMiniCheck size={14} fontWeight="bold" color="white" />
                            {subtasks.filter(s => s.checked).length}/{subtasks.length}
                        </span>
                        <div className="flex flex-col gap-1">
                            {subtasks.map(s => (
                                <Checkbox key={s.id} onChange={() => {}} state={s.checked}>
                                    {s.value}
                                </Checkbox>
                            ))}
                        </div>
                    </>
                )}
            </div>
            <div className="flex gap-1.5 flex-wrap select-none">
                {labels.map(l => (
                    <Label key={l.name} name={l.name} color={l.color} />
                ))}
            </div>
        </div>
    );
}
