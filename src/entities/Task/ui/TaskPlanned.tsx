'use client';
import { useMutation } from '@apollo/client/react';
import React from 'react';
import { HiOutlineClock, HiOutlineInformationCircle } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { IFullTask, IGroupTask, ITask, UPDATE_TASK } from '@entities/Task';
import { GET_TASKS } from '@entities/Task/api/getTasks';
import { getDate, getHour, useContextMenu } from '@shared/lib';
import { DropDownDynamic, LabelComplete, ListDropDown } from '@shared/ui';

interface ITaskPlannedProps {
    task: IFullTask;
}

export default function TaskPlanned({ task }: ITaskPlannedProps) {
    const { onContextMenu, menu, setField } = useContextMenu();

    const [updateTask] = useMutation<{ updateTask: ITask }>(UPDATE_TASK, {
        update(cache, { data }) {
            const updated = data?.updateTask;

            if (!updated) return;

            const existing = cache.readQuery<{ getTasks: IGroupTask[] }>({ query: GET_TASKS });

            if (!existing) return;

            const newGroups = existing.getTasks.map(group => ({
                ...group,
                tasks: group.tasks.map(task =>
                    task.id === updated.id ? { ...task, complete: updated.complete } : task,
                ),
            }));

            cache.writeQuery({
                query: GET_TASKS,
                data: { getTasks: [...newGroups] },
            });
        },
    });
    const handleUpdateTask = async () => {
        await updateTask({ variables: { task: { id: task.id, complete: !task.complete } } });
        setField('state', false);
    };

    const contextMenu = [
        {
            children: [
                {
                    label: task.complete ? 'Mark as Incomplete' : 'Mark as Complete',
                    onClick: handleUpdateTask,
                },
            ],
        },
    ];

    return (
        <div key={task.id} className="flex gap-4" onContextMenu={onContextMenu}>
            <time className="font-semibold">{getHour(task.dueDate)}</time>
            <div className="flex flex-col grow bg-bg-neutral p-2 rounded-sm text-sm relative">
                {task.complete && <LabelComplete complete={task.complete} />}
                <Markdown>{task.body}</Markdown>
                <div className="flex flex-col gap-1 font-semibold mt-4">
                    <span className="flex gap-2 items-center">
                        <HiOutlineClock />
                        {getDate(task.dueDate)}
                    </span>
                    <span className="flex gap-2 items-center">
                        <HiOutlineInformationCircle />
                        {task.board.name} / {task.list.name}
                    </span>
                </div>
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
