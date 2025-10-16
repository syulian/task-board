'use client';
import { useLocale, useTranslations } from 'next-intl';
import React, { useRef, useState } from 'react';
import { HiMiniEllipsisHorizontal } from 'react-icons/hi2';
import { CSSTransition } from 'react-transition-group';
import { setIsExpanded } from '@features/RightSidebar/model/slice/rightSidebarSlice';
import { Planned } from '@entities/Task';
import { getShortDate, useAppSelector, useAppDispatch } from '@shared/lib';
import { useGetGroupedTasksQuery } from '@shared/types';
import { DefaultButton, DropDownContainer, ListDropDown } from '@shared/ui';
import './right-sidebar.animation.css';

export default function RightSidebar() {
    const [isOpen, setIsOpen] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    const isExpanded = useAppSelector(state => state.rightSidebar.isExpanded);
    const dispatch = useAppDispatch();

    const { data: dataTasks } = useGetGroupedTasksQuery({
        skip: !isExpanded,
        fetchPolicy: 'network-only',
    });

    const planned = dataTasks?.getGroupedTasks ?? [];
    const t = useTranslations('RightSidebar');
    const locale = useLocale();

    const dropDownList = [
        {
            children: [
                {
                    label: t('dropDown.panel'),
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
                        <p className="font-semibold flex-1 text-center">{t('title')}</p>
                        <div className="relative">
                            <DefaultButton
                                onClick={() => setIsOpen(prev => !prev)}
                                aria-expanded={isOpen}
                                ariaLabel={t('dropDown.panel')}
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
                            <time className="text-center font-semibold capitalize">
                                {getShortDate(p.date, locale)}
                            </time>
                            {p.tasks.map(t => (
                                <Planned task={t} key={t.id} />
                            ))}
                        </div>
                    ))}
                </div>
            </aside>
        </CSSTransition>
    );
}
