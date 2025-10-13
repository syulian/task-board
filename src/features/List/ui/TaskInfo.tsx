'use client';
import React, { useState } from 'react';
import EditTask from '@features/List/ui/EditTask';
import { TaskCard, Task, TasksList } from '@entities/Task';
import { Popup } from '@shared/ui';

interface IListProps {
    list: TasksList;
    task: Task;
}

export default function TaskInfo({ list, task }: IListProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <TaskCard task={task} list={list} setIsOpen={() => setIsOpen(true)} />
            <Popup isOpen={isOpen} setIsOpen={() => setIsOpen(false)}>
                <EditTask list={list} task={task} />
            </Popup>
        </>
    );
}
