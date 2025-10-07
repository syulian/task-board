'use client';
import { useMutation } from '@apollo/client/react';
import { clsx } from 'clsx';
import React from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import { UPDATE_SUBTASK } from '@entities/Task/api/updateSubtask';
import { useTaskDragAndDropContext } from '@entities/Task/model/context/taskDragAndDropContext';
import { IList } from '@entities/Task/model/types/IList';
import { ITask } from '@entities/Task/model/types/ITask';
import { getDate, useDragAndDrop } from '@shared/lib';
import { Label, Checkbox, StopPropagation } from '@shared/ui';

interface ITaskCardProps {
    task: ITask;
    list: IList;
    setIsOpen: () => void;
}

export default function TaskCard({ task, list, setIsOpen }: ITaskCardProps) {
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

    const [updateSubtask, { loading: updateSubtaskLoading }] = useMutation(UPDATE_SUBTASK);
    const handleUpdate = async (checked: boolean, subtaskId: string) => {
        if (updateSubtaskLoading) return;

        await updateSubtask({ variables: { taskId: task.id, subtaskId, checked } });
    };

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
            onClick={() => setIsOpen()}
            onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsOpen();
                }
            }}
        >
            {(complete || dueDate) && (
                <p
                    className={clsx(
                        'absolute top-0 right-4 py-1 px-2 bg-bg-primary rounded-b-sm font-semibold text-sm border-b border-l border-r border-bg-secondary opacity-80',
                        complete
                            ? 'bg-green-800 text-text-secondary'
                            : dueDate &&
                                  (new Date(dueDate) >= new Date()
                                      ? 'text-blue-400'
                                      : 'text-red-400'),
                    )}
                >
                    {complete ? 'Complete' : dueDate && getDate(dueDate)}
                </p>
            )}
            <p className="font-semibold">{title}</p>
            <div className="text-sm text-gray-400">
                <Markdown remarkPlugins={[remarkBreaks]}>{body ?? ''}</Markdown>
                {subtasks && subtasks.length > 0 && (
                    <>
                        <span className="flex gap-2 items-center py-2 text-text-primary">
                            <HiMiniCheck size={14} fontWeight="bold" />
                            {subtasks.filter(s => s.checked).length}/{subtasks.length}
                        </span>
                        <StopPropagation>
                            <div className="flex flex-col gap-1">
                                {subtasks.map(s => (
                                    <Checkbox
                                        key={s.id}
                                        onChange={() => handleUpdate(!s.checked, s.id)}
                                        state={s.checked}
                                    >
                                        {s.value}
                                    </Checkbox>
                                ))}
                            </div>
                        </StopPropagation>
                    </>
                )}
            </div>
            <div className="flex gap-1.5 flex-wrap select-none">
                {labels?.map(l => (
                    <Label key={l.id} name={l.name} color={l.color} />
                ))}
            </div>
        </div>
    );
}
