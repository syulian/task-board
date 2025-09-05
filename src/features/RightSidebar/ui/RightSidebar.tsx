'use client';
import React, { useRef, useState } from 'react';
import {
    HiMiniEllipsisHorizontal,
    HiOutlineClock,
    HiOutlineInformationCircle,
} from 'react-icons/hi2';
import Markdown from 'react-markdown';
import { CSSTransition } from 'react-transition-group';
import { setIsExpanded } from '@features/RightSidebar';
import { getDate, getShortDate, getHour, useAppSelector, useAppDispatch } from '@shared/lib';
import { DefaultButton, DropDown } from '@shared/ui';
import './right-sidebar.animation.css';

export default function RightSidebar() {
    const planned = [
        {
            date: '2025-09-01',
            tasks: [
                {
                    time: '2025-09-01 11:01:01',
                    board: '☠️ Website',
                    list: 'To Do',
                    due: '2025-09-09',
                    body: '*Need to create a new task! Need to create a new task!* \n\n *Need to create a new task! Need to create a new task!*',
                },
                {
                    time: '2025-09-01 01:12:02',
                    board: '☠️ Website',
                    list: 'To Do',
                    due: '2025-09-5',
                    body: '*Need to create a new task! Need to create a new task!* \n\n *Need to create a new task! Need to create a new task!*',
                },
            ],
        },
        {
            date: '2025-01-02',
            tasks: [
                {
                    time: '2025-01-02 11:01:01',
                    board: '☠️ Website',
                    list: 'To Do',
                    due: '2025-01-05',
                    body: '*Need to create a new task! Need to create a new task!* \n\n *Need to create a new task! Need to create a new task!*',
                },
            ],
        },
    ];

    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    const dispatch = useAppDispatch();
    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);

    const dropDownList = [
        {
            label: 'Hide Panel',
            onClick: () => {
                setIsOpen(false);
                dispatch(setIsExpanded(false));
            },
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
                className="max-w-85 bg-surface-dark h-screen p-4 border-surface-light border-l shadow-xl/90"
                ref={sidebarRef}
            >
                <div className="min-w-77 flex flex-col gap-6 overflow-y-scroll ">
                    <div className="flex items-center py-4 border-b border-surface-lighter h-18.5 text-surface-lighter">
                        <p className="font-semibold flex-1 text-center">Upcoming Tasks</p>
                        <div className="relative">
                            <DefaultButton
                                onClick={() => setIsOpen(prev => !prev)}
                                aria-expanded={isOpen}
                            >
                                <HiMiniEllipsisHorizontal size={24} />
                            </DefaultButton>
                            <DropDown list={dropDownList} isOpen={isOpen} setIsOpen={setIsOpen} />
                        </div>
                    </div>
                    {planned.map(p => (
                        <div key={p.date} className="flex justify-center flex-col gap-6">
                            <time className="text-center font-semibold">
                                {getShortDate(p.date)}
                            </time>
                            {p.tasks.map(t => (
                                <div key={t.time} className="flex gap-4">
                                    <time className="font-semibold">{getHour(t.time)}</time>
                                    <div className="flex flex-col bg-surface-light p-2 rounded-sm text-sm">
                                        <Markdown>{t.body}</Markdown>
                                        <div className="flex flex-col gap-1 font-semibold mt-4">
                                            <span className="flex gap-2 items-center">
                                                <HiOutlineClock />
                                                {getDate(t.due)}
                                            </span>
                                            <span className="flex gap-2 items-center">
                                                <HiOutlineInformationCircle />
                                                {t.board}, {t.list}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </aside>
        </CSSTransition>
    );
}
