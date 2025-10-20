import BoardsGroup from '@entities/Board/model/types/BoardsGroup';
import { clearTypename } from '@shared/lib';
import { useUpdateBoardsOrdersMutation } from '@shared/types';

const useBoardOnOrder = () => {
    const [updateOrders, { loading: ordersLoading }] = useUpdateBoardsOrdersMutation({
        refetchQueries: ['GetBoardsGroups'],
    });

    return async (boardsGroups: BoardsGroup[]) => {
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
};

export default useBoardOnOrder;
