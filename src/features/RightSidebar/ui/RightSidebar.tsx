'use client';
import { useQuery } from '@apollo/client/react';
import React, { useRef, useState } from 'react';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { setIsExpanded } from '@features/RightSidebar/model/slice/rightSidebarSlice';
import { IGroupTask, TaskPlanned, GET_GROUPED_TASKS } from '@entities/Task';
import { getShortDate, useAppSelector, useAppDispatch } from '@shared/lib';
import { DefaultButton, DropDownContainer, ListDropDown } from '@shared/ui';
import './right-sidebar.animation.css';

export default function RightSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);
    const dispatch = useAppDispatch();

    const { data: dataTasks } = useQuery<{ getGroupedTasks: IGroupTask[] }>(GET_GROUPED_TASKS, {
        skip: !isExpanded,
        fetchPolicy: 'network-only',
    });
    const planned = dataTasks?.getGroupedTasks ?? [];

    const dropDownList = [
        {
            children: [
                {
                    label: 'Hide Panel',
                    onClick: () => {
                        setIsOpen(false);
                        dispatch(setIsExpanded(false));
                    },
                },
            ],
        },
    ];

    return (
        <CSSTransition
            in={isExpanded}
            nodeRef={sidebarRef}
            timeout={300}
            classNames="right-sidebar"
            unmountOnExit
        >
            <aside
                className="max-w-85 bg-bg-secondary h-screen  border-bg-neutral border-l shadow-xl/90 overflow-hidden"
                ref={sidebarRef}
            >
                <div className="min-w-85 flex flex-col gap-6 overflow-y-scroll p-4">
                    <div className="flex items-center py-4 border-b border-bg-neutral-lighter h-18.5">
                        <p className="font-semibold flex-1 text-center">Upcoming Tasks</p>
                        <div className="relative">
                            <DefaultButton
                                onClick={() => setIsOpen(prev => !prev)}
                                aria-expanded={isOpen}
                            >
                                <HiMiniEllipsisHorizontal size={24} />
                            </DefaultButton>
                            <DropDownContainer
                                isOpen={isOpen}
                                setIsOpen={() => setIsOpen(false)}
                                className="right-0"
                            >
                                <ListDropDown list={dropDownList} />
                            </DropDownContainer>
                        </div>
                    </div>
                    {planned.map(p => (
                        <div key={p.date.toString()} className="flex justify-center flex-col gap-6">
                            <time className="text-center font-semibold">
                                {getShortDate(p.date)}
                            </time>
                            {p.tasks.map(t => (
                                <TaskPlanned task={t} key={t.id} />
                            ))}
                        </div>
                    ))}
                </div>
            </aside>
        </CSSTransition>
    );
}
