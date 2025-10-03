import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { DELETE_BOARDS_GROUP } from '@features/NavigationMenu/api/deleteBoardsGroup';
import { UPDATE_BOARDS_GROUP } from '@features/NavigationMenu/api/updateBoardsGroup';
import { IBoardsGroup } from '@entities/Board';
import { createStateController } from '@shared/lib';

const useGroupContextMenu = (group: IBoardsGroup) => {
    const [isOpen, setIsOpen] = useState({
        menu: false,
        group: true,
        add: false,
    });
    const [disabled, setDisabled] = useState(true);

    const setIsOpenField = createStateController<typeof isOpen>(setIsOpen);

    const [deleteBoardsGroup, { loading: deleteBoardsGroupLoading }] = useMutation(
        DELETE_BOARDS_GROUP,
        {
            refetchQueries: ['GetBoardsGroups'],
        },
    );
    const [updateBoardsGroup, { loading: updateBoardsGroupLoading }] =
        useMutation(UPDATE_BOARDS_GROUP);

    const handleBoardsGroupRename = async (name: string) => {
        if (updateBoardsGroupLoading) return;

        setDisabled(true);
        await updateBoardsGroup({ variables: { id: group.id, name: name } });
    };

    const handleBoardsGroupDelete = async () => {
        if (deleteBoardsGroupLoading) return;
        await deleteBoardsGroup({ variables: { id: group.id } });
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
