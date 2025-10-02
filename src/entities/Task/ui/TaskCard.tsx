'use client';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { EditTask } from '@entities/Task';
import { useTaskDragAndDropContext } from '@entities/Task/model/context/taskDragAndDropContext';
import { IListSchema } from '@entities/Task/model/types/IListSchema';
import { ITask } from '@entities/Task/model/types/ITask';
import { getDate, useDragAndDrop } from '@shared/lib';
import { Label, Checkbox, Popup, StopPropagation } from '@shared/ui';

interface ITaskCardProps {
    task: ITask;
    list: IListSchema;
}

export default function TaskCard({ task, list }: ITaskCardProps) {
    const [isOpen, setIsOpen] = useState(false);
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
            role="button"
            tabIndex={0}
            aria-label={`Edit task ${task.title}`}
            className={clsx(
                'flex flex-col gap-2 border border-bg-neutral bg-bg-neutral rounded-sm p-2 mt-2 cursor-pointer relative',
                isDragOver && currentItem && 'border-dashed border-bg-neutral-lighter',
            )}
            draggable
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => setIsOpen(true)}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsOpen(true);
                }
            }}
        >
            {(complete || dueDate) && (
                <p
                    className={clsx(
                        'absolute top-0 right-4 py-1 px-2 bg-bg-primary rounded-b-sm font-semibold text-sm border-b border-l border-r border-bg-secondary opacity-80',
                        complete
                            ? 'bg-green-800 text-text-secondary'
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
                        <span className="flex gap-2 items-center py-2 text-text-primary">
                            <HiMiniCheck size={14} fontWeight="bold" />
                            {subtasks.filter(s => s.checked).length}/{subtasks.length}
                        </span>
                        <StopPropagation>
                            <div className="flex flex-col gap-1">
                                {subtasks.map(s => (
                                    <Checkbox key={s.id} onChange={() => {}} state={s.checked}>
                                        {s.value}
                                    </Checkbox>
                                ))}
                            </div>
                        </StopPropagation>
                    </>
                )}
            </div>
            <div className="flex gap-1.5 flex-wrap select-none">
                {labels.map(l => (
                    <Label key={l.name} name={l.name} color={l.color} />
                ))}
            </div>
            <StopPropagation>
                <Popup isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                    <EditTask />
                </Popup>
            </StopPropagation>
        </div>
    );
}
