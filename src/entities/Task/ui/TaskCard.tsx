'use client';
import React from 'react';
import Markdown from 'react-markdown';
import { TaskSchema } from '@entities/Task/model/types/TaskSchema';
import { Label } from '@shared/ui';

interface ITaskCardProps {
    task: TaskSchema;
}

export default function TaskCard({ task }: ITaskCardProps) {
    const { body, title, labels } = task;

    return (
        <div className="flex flex-col gap-3 border-surface-dark border rounded-sm bg-surface-light p-2 mt-2">
            <p className="font-semibold">{title}</p>
            <div className="text-sm text-gray-400">
                <Markdown>{body}</Markdown>
            </div>
            <div className="flex gap-1.5 flex-wrap select-none">
                {labels.map(l => (
                    <Label key={l.name} name={l.name} color={l.color} />
                ))}
            </div>
        </div>
    );
}
