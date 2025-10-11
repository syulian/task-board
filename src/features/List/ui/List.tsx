'use client';
import { useMutation } from '@apollo/client/react';
import { clsx } from 'clsx';
import React, { useState } from 'react';
import { HiEllipsisHorizontal, HiMiniPlus } from 'react-icons/hi2';
import { CREATE_LIST } from '@features/List/api/createList';
import { DELETE_LIST } from '@features/List/api/deleteList';
import { UPDATE_LIST } from '@features/List/api/updateList';
import useListDragAndDrop from '@features/List/lib/hooks/useListDragAndDrop';
import EditTask from '@features/List/ui/EditTask';
import TaskInfo from '@features/List/ui/TaskInfo';
import { COLORS, ColorsDropDown } from '@entities/Label';
import { IList, ITask } from '@entities/Task';
import { createStateController, useSortedItems } from '@shared/lib';
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
    list: IList;
}

export default function List({ list }: IListProps) {
    const [isOpen, setIsOpen] = useState({
        settings: false,
        colors: false,
        popup: false,
    });

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const [createList] = useMutation(CREATE_LIST, { refetchQueries: ['GetLists'] });
    const [deleteList] = useMutation(DELETE_LIST, { refetchQueries: ['GetLists'] });
    const [updateList, { loading: updateListLoading }] = useMutation(UPDATE_LIST);

    const editList = [
        {
            title: `${list.items.length} Tasks`,
            children: [
                {
                    label: 'Add List',
                    onClick: async () => {
                        await createList({
                            variables: {
                                name: 'New List',
                                color: COLORS[COLORS.length - 1],
                                board: list.board,
                            },
                        });
                    },
                },
            ],
        },
        {
            children: [
                {
                    label: 'Rename',
                    onClick: () => {
                        setDisabled(false);
                        setIsOpenField('settings', false);
                    },
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
                    onClick: () => deleteList({ variables: { id: list.id } }),
                },
            ],
        },
    ];

    const [disabled, setDisabled] = useState(true);

    const handleListUpdate = async (name?: string, color?: string) => {
        if (updateListLoading) return;

        setDisabled(true);
        await updateList({ variables: { id: list.id, name, color } });
    };

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

    const sortedItems = useSortedItems<ITask>(list.items);

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
