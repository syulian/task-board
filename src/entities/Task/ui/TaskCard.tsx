'use client';
import { clsx } from 'clsx';
import React from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';
import useTaskCard from '@entities/Task/lib/hooks/useTaskCard';
import useTaskDragAndDrop from '@entities/Task/lib/hooks/useTaskDragAndDrop';
import Task from '@entities/Task/model/types/Task';
import TasksList from '@entities/Task/model/types/TasksList';
import {
    Label,
    CheckboxDefault,
    StopPropagation,
    ListDropDown,
    DropDownDynamic,
    LabelComplete,
} from '@shared/ui';

interface ITaskCardProps {
    task: Task;
    list: TasksList;
    setIsOpen: () => void;
}

export default function TaskCard({ task, list, setIsOpen }: ITaskCardProps) {
    const { body, title, labels, subtasks, complete, dueDate } = task;

    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop, currentItem } =
        useTaskDragAndDrop(task, list);

    const { onContextMenu, handleUpdate, menu, contextMenu, setField } = useTaskCard(task);

    return (
        <div
            role="button"
            tabIndex={0}
            aria-label={`Edit task ${task.title}`}
            className={clsx(
                'flex flex-col gap-2 border border-dashed bg-bg-neutral rounded-sm p-2 mt-2 cursor-pointer relative',
                isDragOver && currentItem ? 'border-bg-neutral-lighter' : 'border-transparent',
            )}
            draggable
            onDragLeave={onDragLeave}
            onDragEnd={onDragEnd}
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDrop={onDrop}
            onClick={() => setIsOpen()}
            onKeyDown={e => {
                if (e.target !== e.currentTarget) return;
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setIsOpen();
                }
            }}
            onContextMenu={onContextMenu}
        >
            {(complete || dueDate) && <LabelComplete complete={complete} dueDate={dueDate} />}
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
                                    <CheckboxDefault
                                        key={s.id}
                                        onChange={() => handleUpdate(!s.checked, s.id)}
                                        state={s.checked}
                                    >
                                        {s.value}
                                    </CheckboxDefault>
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
            <DropDownDynamic
                coordinates={menu.coordinates}
                isOpen={menu.state}
                setIsOpen={() => setField('state', false)}
            >
                <ListDropDown list={contextMenu} />
            </DropDownDynamic>
        </div>
    );
}
