'use client';
import React from 'react';
import { HiOutlineClock, HiOutlineInformationCircle } from 'react-icons/hi2';
import Markdown from 'react-markdown';
import usePlanned from '@entities/Task/lib/hooks/usePlanned';
import { IGroupTask } from '@entities/Task/model/types/IGroupTask';
import { getDate, getHour } from '@shared/lib';
import { DropDownDynamic, LabelComplete, ListDropDown } from '@shared/ui';

interface IPlannedProps {
    task: IGroupTask;
}

export default function Planned({ task }: IPlannedProps) {
    const { menu, onContextMenu, contextMenu, setField } = usePlanned(task);

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
                        {task.board?.name} / {task.list.name}
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
