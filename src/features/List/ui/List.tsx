'use client';
import { clsx } from 'clsx';
import React from 'react';
import { HiEllipsisHorizontal, HiMiniPlus } from 'react-icons/hi2';
import useList from '@features/List/lib/hooks/useList';
import useListDragAndDrop from '@features/List/lib/hooks/useListDragAndDrop';
import EditTask from '@features/List/ui/EditTask';
import TaskInfo from '@features/List/ui/Info/TaskInfo';
import { ColorsDropDown } from '@entities/Label';
import { TasksList } from '@entities/Task';
import { useSortedItems } from '@shared/lib';
import {
    DefaultButton,
    AddButton,
    DropDownContainer,
    ListDropDown,
    Drag,
    Popup,
    InlineInput,
} from '@shared/ui';

interface IListProps {
    list: TasksList;
}

export default function List({ list }: IListProps) {
    const { isOpen, disabled, setIsOpenField, editList, handleListUpdate } = useList(list);

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        currentOrder,
        onDropOrder,
        onDragOver,
        onDrop,
    } = useListDragAndDrop(list);

    const sortedItems = useSortedItems(list.items);

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
            <div
                className="flex items-center justify-between pb-2 px-2 border-b-2 rounded-b-xs"
                style={{ borderBottomColor: list.color }}
            >
                <Drag onDragStart={onDragStartOrder} onDragEnd={onDragEndOrder} target="li">
                    {disabled ? (
                        <p>{list.name}</p>
                    ) : (
                        <InlineInput
                            value={list.name}
                            disabled={disabled}
                            onBlur={handleListUpdate}
                        />
                    )}
                </Drag>
                <span className="flex relative">
                    <DefaultButton onClick={() => setIsOpenField('popup', true)}>
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
                        <ColorsDropDown
                            onClick={async color => {
                                await handleListUpdate(undefined, color);
                                setIsOpenField('colors', false);
                            }}
                        />
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
                {sortedItems?.map(t => (
                    <TaskInfo key={t.id} task={t} list={list} />
                ))}
            </div>
            <AddButton onClick={() => setIsOpenField('popup', true)} />
            <Popup isOpen={isOpen.popup} setIsOpen={() => setIsOpenField('popup', false)}>
                <EditTask list={list} />
            </Popup>
        </li>
    );
}
