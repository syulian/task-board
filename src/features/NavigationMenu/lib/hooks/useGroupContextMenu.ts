import { useState } from 'react';
import { BoardsGroup } from '@entities/Board';
import { createStateController } from '@shared/lib';
import { useDeleteBoardsGroupMutation, useUpdateBoardsGroupMutation } from '@shared/types';

const useGroupContextMenu = (group: BoardsGroup) => {
    const [isOpen, setIsOpen] = useState({
        menu: false,
        group: true,
        add: false,
    });
    const [disabled, setDisabled] = useState(true);

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const [deleteBoardsGroup, { loading: deleteBoardsGroupLoading }] = useDeleteBoardsGroupMutation(
        {
            refetchQueries: ['GetBoardsGroups'],
        },
    );
    const [updateBoardsGroup, { loading: updateBoardsGroupLoading }] =
        useUpdateBoardsGroupMutation();

    const handleBoardsGroupRename = async (name: string) => {
        if (updateBoardsGroupLoading) return;

        try {
            await updateBoardsGroup({ variables: { id: group.id, name: name } });
        } catch (e) {
            console.error(e);
        } finally {
            setDisabled(true);
        }
    };

    const handleBoardsGroupDelete = async () => {
        if (deleteBoardsGroupLoading) return;

        try {
            await deleteBoardsGroup({ variables: { id: group.id } });
        } catch (e) {
            console.error(e);
        }
    };

    const contextMenu = [
        {
            children: [
                {
                    label: 'Rename',
                    onClick: () => {
                        setDisabled(false);
                        setIsOpenField('menu', false);
                    },
                },
                {
                    label: 'Delete',
                    onClick: async () => {
                        await handleBoardsGroupDelete();
                        setIsOpenField('menu', false);
                    },
                },
            ],
        },
    ];

    return {
        disabled,
        isOpen,
        setIsOpen,
        handleBoardsGroupRename,
        handleBoardsGroupDelete,
        contextMenu,
        setIsOpenField,
    };
};

export default useGroupContextMenu;
