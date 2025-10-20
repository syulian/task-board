'use client';
import { useTranslations } from 'next-intl';
import React from 'react';
import { HiOutlineClock, HiOutlineInformationCircle } from 'react-icons/hi2';
import ReactMarkdown from 'react-markdown';
import usePlanned from '@entities/Task/lib/hooks/usePlanned';
import GroupTask from '@entities/Task/model/types/GroupTask';
import { getDate, getHour } from '@shared/lib';
import { DropDownDynamic, LabelComplete, ListDropDown } from '@shared/ui';

interface IPlannedProps {
    task: GroupTask;
}

export default function Planned({ task }: IPlannedProps) {
    const { menu, onContextMenu, contextMenu, setField } = usePlanned(task);
    const t = useTranslations('Main');

    return (
        <div key={task.id} className="flex gap-4" onContextMenu={onContextMenu}>
            <time className="font-semibold">{getHour(task.dueDate)}</time>
            <div className="flex flex-col grow bg-bg-neutral p-2 rounded-sm text-sm relative">
                {task.complete && <LabelComplete complete={task.complete} />}
                <ReactMarkdown>{task.body}</ReactMarkdown>
                <div className="flex flex-col gap-1 font-semibold mt-4">
                    <span className="flex gap-2 items-center">
                        <HiOutlineClock />
                        {getDate(task.dueDate, t)}
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
