import { BoardsGroup } from '@entities/Board';
import { clearTypename } from '@shared/lib';
import { useUpdateBoardsOrdersMutation } from '@shared/types/generated/graphql';

const useBoardOnOrder = () => {
    const [updateOrders, { loading: ordersLoading }] = useUpdateBoardsOrdersMutation({
        refetchQueries: ['GetBoardsGroups'],
    });

    return async (boardsGroups: BoardsGroup[]) => {
        if (ordersLoading) return;

        const boards = boardsGroups.flatMap(g =>
            g.items.map(b => ({
                ...b,
                groupId: g.id,
            })),
        );

        await updateOrders({ variables: { boards: clearTypename(boards) } });
    };
};

export default useBoardOnOrder;
