import { useState } from 'react';
import { COLORS } from '@entities/Label';
import { TasksList } from '@entities/Task';
import { createStateController } from '@shared/lib';
import { useCreateListMutation, useDeleteListMutation, useUpdateListMutation } from '@shared/types';

const useList = (list: TasksList) => {
    const [isOpen, setIsOpen] = useState({
        settings: false,
        colors: false,
        popup: false,
    });
    const [disabled, setDisabled] = useState(true);

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const [createList] = useCreateListMutation({ refetchQueries: ['GetLists'] });
    const [deleteList] = useDeleteListMutation({ refetchQueries: ['GetLists'] });
    const [updateList, { loading: updateListLoading }] = useUpdateListMutation();

    const handleListUpdate = async (name?: string, color?: string) => {
        if (updateListLoading) return;

        try {
            await updateList({ variables: { id: list.id, name, color, boardId: list.board } });
        } catch (e) {
            console.log(e);
        } finally {
            setDisabled(true);
        }
    };

    const handleListDelete = async () => {
        try {
            await deleteList({ variables: { id: list.id } });
        } catch (e) {
            console.log(e);
        }
    };

    const editList = [
        {
            title: `${list.items?.length ?? 0} Tasks`,
            children: [
                {
                    label: 'Add List',
                    onClick: async () => {
                        try {
                            await createList({
                                variables: {
                                    name: 'New List',
                                    color: COLORS[COLORS.length - 1],
                                    boardId: list.board,
                                },
                            });
                        } catch (e) {
                            console.log(e);
                        }
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
                    onClick: handleListDelete,
                },
            ],
        },
    ];

    return {
        isOpen,
        disabled,
        setIsOpenField,
        editList,
        handleListUpdate,
    };
};

export default useList;
