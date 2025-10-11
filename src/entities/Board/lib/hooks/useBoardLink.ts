import { useMutation } from '@apollo/client/react';
import { UPDATE_BOARDS_ORDERS } from '@entities/Board/api/updateBoardsOrders';
import { useBoardDragAndDropContext } from '@entities/Board/model/context/boardDragAndDropContext';
import IBoard from '@entities/Board/model/types/IBoard';
import IBoardsGroup from '@entities/Board/model/types/IBoardsGroup';
import { clearTypename, useDragAndDrop } from '@shared/lib';

const useBoardLink = (group: IBoardsGroup, board: IBoard) => {
    const [updateOrders, { loading: ordersLoading }] = useMutation(UPDATE_BOARDS_ORDERS, {
        refetchQueries: ['GetBoardsGroups'],
    });

    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } =
        useBoardDragAndDropContext();

    const onOrder = async (boardsGroups: IBoardsGroup[]) => {
        if (ordersLoading) return;
        const boards = boardsGroups.flatMap(g => g.items.map(b => ({ ...b, groupId: g.id })));

        await updateOrders({ variables: { boards: clearTypename(boards) } });
    };

    const { isDragOver, onDragOver, onDragLeave, onDragStart, onDragEnd, onDrop } = useDragAndDrop(
        group,
        board,
        {
            currentItem,
            setGroups,
            setCurrentItem,
            setCurrentGroup,
            currentGroup,
        },
        onOrder,
    );

    return {
        isDragOver,
        onDragOver,
        onDragLeave,
        onDragStart,
        onDragEnd,
        onDrop,
        currentItem,
    };
};

export default useBoardLink;
