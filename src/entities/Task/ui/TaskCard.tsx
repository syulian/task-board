'use client';
import React from 'react';
import { HiMiniCheck } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { TaskSchema } from '@entities/Task/model/types/TaskSchema';
import { Label, Checkbox } from '@shared/ui';

interface ITaskCardProps {
    task: TaskSchema;
}

export default function TaskCard({ task }: ITaskCardProps) {
    const { body, title, labels, attachments } = task;

    return (
        <div className="flex flex-col gap-2 border-surface-dark border rounded-sm bg-surface-light p-2 mt-2">
            <p className="font-semibold">{title}</p>
            <div className="text-sm text-gray-400">
                <Markdown>{body}</Markdown>
                {attachments && (
                    <>
                        <span className="flex gap-2 items-center py-2">
                            <HiMiniCheck size={14} fontWeight="bold" color="white" />
                            {attachments.filter(a => a.checked).length}/{attachments.length}
                        </span>
                        <div className="flex flex-col gap-1">
                            {attachments.map(a => (
                                <Checkbox key={a.value} onChange={() => {}} state={a.checked}>
                                    {a.value}
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
