'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import ListSchema from '@widgets/Board/model/types/ListSchema';
import { List } from '@features/List';
import { COLORS } from '@entities/Label';
import {
    Task,
    TasksList,
    TaskDragAndDropContext,
    TaskDragAndDropOrderContext,
} from '@entities/Task';
import { useSortedItems } from '@shared/lib';
import { useCreateListMutation, useGetListsQuery } from '@shared/types';
import { AddInput } from '@shared/ui';

type ListValues = z.infer<typeof ListSchema>;

export default function Board() {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const [currentItem, setCurrentItem] = useState<Task | null>(null);
    const [currentGroup, setCurrentGroup] = useState<TasksList | null>(null);
    const [currentOrder, setCurrentOrder] = useState<TasksList | null>(null);
    const [lists, setLists] = useState<TasksList[]>([]);

    const { status } = useSession();

    const [createList] = useCreateListMutation({ refetchQueries: ['GetLists'] });
    const { data: dataLists, loading: getListsLoading } = useGetListsQuery({
        variables: { boardId: boardId ?? '' },
        skip: status !== 'authenticated' || !boardId,
    });

    useEffect(() => {
        if (!getListsLoading && dataLists?.getLists) {
            setLists(dataLists.getLists);
        }
    }, [dataLists, getListsLoading]);

    const { control, handleSubmit } = useForm({ resolver: zodResolver(ListSchema) });

    const onSubmit = async (data: ListValues) => {
        if (!boardId) return;
        try {
            await createList({
                variables: { name: data.name, color: COLORS[0], boardId: boardId },
            });
        } catch (e) {
            console.log(e);
        }
    };

    const sortedLists = useSortedItems(lists);
    const t = useTranslations('Main');

    return (
        <>
            {status === 'authenticated' && (
                <section className="w-full flex gap-8 overflow-x-scroll pb-4">
                    <TaskDragAndDropContext
                        value={{
                            currentItem: currentItem,
                            setCurrentItem: setCurrentItem,
                            currentGroup: currentGroup,
                            setCurrentGroup: setCurrentGroup,
                            setGroups: setLists,
                        }}
                    >
                        <TaskDragAndDropOrderContext
                            value={{
                                currentOrder: currentOrder,
                                setCurrentOrder: setCurrentOrder,
                                setOrders: setLists,
                            }}
                        >
                            {sortedLists.length > 0 && (
                                <nav>
                                    <ul className="flex gap-8">
                                        {sortedLists.map(l => (
                                            <List list={l} key={l.id} />
                                        ))}
                                    </ul>
                                </nav>
                            )}
                        </TaskDragAndDropOrderContext>
                    </TaskDragAndDropContext>
                    <form className="min-w-80" onSubmit={handleSubmit(onSubmit)}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <AddInput
                                    placeholder={t('list.add')}
                                    ariaLabel={t('list.add')}
                                    onChange={event => field.onChange(event.target.value)}
                                />
                            )}
                        />
                    </form>
                </section>
            )}
        </>
    );
}
