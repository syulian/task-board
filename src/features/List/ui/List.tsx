'use client';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import { HiEllipsisHorizontal, HiMiniPlus } from 'react-icons/hi2';
import { ColorsDropDown } from '@entities/Label';
import {
    TaskCard,
    EditTask,
    IListSchema,
    useTaskDragAndDropContext,
    useTaskDragAndDropOrderContext,
} from '@entities/Task';
import { createStateController, useOrderDragAndDrop, useParentDragAndDrop } from '@shared/lib';
import { DefaultButton, AddButton, DropDownContainer, ListDropDown, Drag, Popup } from '@shared/ui';

interface IListProps {
    list: IListSchema;
}

export default function List({ list }: IListProps) {
    const [isOpen, setIsOpen] = useState({
        settings: false,
        colors: false,
        popup: false,
    });

    const { currentItem, currentGroup, setGroups } = useTaskDragAndDropContext();
    const { setCurrentOrder, currentOrder, setOrders } = useTaskDragAndDropOrderContext();

    const { onDragOver, onDrop } = useParentDragAndDrop(list, {
        currentItem,
        setGroups,
        currentGroup,
    });

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    } = useOrderDragAndDrop(list, {
        currentOrder,
        setCurrentOrder,
        setOrders,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const editList = [
        {
            title: '2 Cards',
            children: [
                {
                    label: 'Add List',
                    onClick: () => {},
                },
            ],
        },
        {
            children: [
                {
                    label: 'Rename',
                    onClick: () => {},
                },
                {
                    label: 'Change Color',
                    onClick: () => {
                        setIsOpenField('settings', false);
                        setIsOpenField('colors', true);
                    },
                },
            ],
        },
        {
            children: [
                {
                    label: 'Delete',
                    onClick: () => {},
                },
            ],
        },
    ];

    return (
        <li
            className={clsx(
                'flex flex-col border-bg-neutral border rounded-sm w-80 h-[calc(100vh-124px)] p-4 relative',
                isDragOverOrder && currentOrder && 'border-dashed border-bg-neutral-lighter',
            )}
            onDragOver={onDragOverOrder}
            onDragLeave={onDragLeaveOrder}
            onDrop={onDropOrder}
        >
            <div className="flex items-center justify-between pb-2 px-2 border-b-2 border-red-900 rounded-b-xs">
                <Drag onDragStart={onDragStartOrder} onDragEnd={onDragEndOrder} target="li">
                    <p>{list.name}</p>
                </Drag>
                <span className="flex relative">
                    <DefaultButton onClick={() => {}}>
                        <HiMiniPlus size={24} />
                    </DefaultButton>
                    <DefaultButton onClick={() => setIsOpenField('settings', true)}>
                        <HiEllipsisHorizontal size={24} />
                    </DefaultButton>
                    <DropDownContainer
                        isOpen={isOpen.settings}
                        setIsOpen={() => setIsOpenField('settings', false)}
                        className="right-0 top-full"
                    >
                        <ListDropDown list={editList} />
                    </DropDownContainer>
                    <DropDownContainer
                        isOpen={isOpen.colors}
                        setIsOpen={() => setIsOpenField('colors', false)}
                        className="right-0 top-full"
                    >
                        <ColorsDropDown onClick={(color) => {}} />
                    </DropDownContainer>
                </span>
            </div>
            <div
                className="overflow-y-scroll h-full"
                onDragOver={onDragOver}
                onDrop={e => {
                    onDrop(e);
                }}
            >
                {list.items.map(t => (
                    <TaskCard key={t.id} task={t} list={list} />
                ))}
            </div>
            <AddButton onClick={() => setIsOpenField('popup', true)} />
            <Popup isOpen={isOpen.popup} setIsOpen={() => setIsOpenField('popup', false)}>
                <EditTask />
            </Popup>
        </li>
    );
}
