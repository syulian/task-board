import { useMutation } from '@apollo/client/react';
import { IBoardLink, IBoardsGroup, useBoardDragAndDropContext } from '@entities/Board';
import { UPDATE_BOARDS_ORDERS } from '@entities/Board/api/updateBoardsOrders';
import { clearTypename, useDragAndDrop } from '@shared/lib';

const useBoardLink = (group: IBoardsGroup, board: IBoardLink) => {
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
        currentItem
    };
};

export default useBoardLink;
