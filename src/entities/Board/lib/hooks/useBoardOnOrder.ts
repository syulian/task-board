import { useMutation } from '@apollo/client/react';
import { IBoardsGroup, UPDATE_BOARDS_ORDERS } from '@entities/Board';
import { clearTypename } from '@shared/lib';

const useTaskOnOrder = () => {
    const [updateOrders, { loading: ordersLoading }] = useMutation(UPDATE_BOARDS_ORDERS, {
        refetchQueries: ['GetBoardsGroups'],
    });

    return async (boardsGroups: IBoardsGroup[]) => {
        if (ordersLoading) return;
        const boards = boardsGroups.flatMap(g => g.items.map(b => ({ ...b, groupId: g.id })));

        await updateOrders({ variables: { boards: clearTypename(boards) } });
    };
};

export default useTaskOnOrder;
