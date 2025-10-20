import { useBoardDragAndDropContext } from '@entities/Board/model/context/boardDragAndDropContext';
import Board from '@entities/Board/model/types/Board';
import BoardsGroup from '@entities/Board/model/types/BoardsGroup';
import { clearTypename, useDragAndDrop } from '@shared/lib';
import { useUpdateBoardsOrdersMutation } from '@shared/types';

const useBoardLink = (group: BoardsGroup, board: Board) => {
    const [updateOrders, { loading: ordersLoading }] = useUpdateBoardsOrdersMutation({
        refetchQueries: ['GetBoardsGroups'],
    });

    const { currentItem, setGroups, setCurrentItem, setCurrentGroup, currentGroup } =
        useBoardDragAndDropContext();

    const onOrder = async (boardsGroups: BoardsGroup[]) => {
        if (ordersLoading) return;

        try {
            const boards = boardsGroups.flatMap(g =>
                g.items.map(b => ({
                    ...b,
                    groupId: g.id,
                })),
            );

            await updateOrders({ variables: { boards: clearTypename(boards) } });
        } catch (e) {
            console.error(e);
        }
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
