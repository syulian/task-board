import { useState } from 'react';
import Board from '@entities/Board/model/types/Board';
import { useDeleteBoardMutation, useUpdateBoardMutation } from '@shared/types/generated/graphql';

const useLinkContextMenu = (board: Board) => {
    const [disabled, setDisabled] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const [deleteBoard, { loading: deleteBoardLoading }] = useDeleteBoardMutation({
        refetchQueries: ['GetBoardsGroups'],
    });
    const [updateBoard, { loading: updateBoardLoading }] = useUpdateBoardMutation();

    const handleBoardRename = async (name: string) => {
        if (updateBoardLoading) return;

        setDisabled(true);
        await updateBoard({ variables: { id: board.id, name: name } });
    };

    const handleBoardDelete = async () => {
        if (deleteBoardLoading) return;
        await deleteBoard({ variables: { id: board.id } });
    };

    const contextMenu = [
        {
            children: [
                {
                    label: 'Rename',
                    onClick: () => {
                        setDisabled(false);
                        setIsOpen(false);
                    },
                },
                {
                    label: 'Delete',
                    onClick: async () => {
                        await handleBoardDelete();
                        setIsOpen(false);
                    },
                },
            ],
        },
    ];

    return {
        disabled,
        isOpen,
        setIsOpen,
        handleBoardRename,
        handleBoardDelete,
        contextMenu,
    };
};

export default useLinkContextMenu;
