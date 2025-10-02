import { useMutation } from '@apollo/client/react';
import { useState } from 'react';
import { DELETE_BOARD } from '@entities/Board/api/deleteBoard';
import { UPDATE_BOARD } from '@entities/Board/api/updateBoard';
import IBoard from '@entities/Board/model/types/IBoard';

const useLinkContextMenu = (board: IBoard) => {
    const [disabled, setDisabled] = useState(true);
    const [isOpen, setIsOpen] = useState(false);

    const [deleteBoard, { loading: deleteBoardLoading }] = useMutation(DELETE_BOARD, {
        refetchQueries: ['GetBoardsGroups'],
    });
    const [updateBoard, { loading: updateBoardLoading }] = useMutation(UPDATE_BOARD);

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
