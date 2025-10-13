import {
    TasksList,
    useTaskDragAndDropContext,
    useTaskDragAndDropOrderContext,
} from '@entities/Task';
import useTaskOnOrder from '@entities/Task/lib/hooks/useTaskOnOrder';
import { useOrderDragAndDrop, useParentDragAndDrop } from '@shared/lib';
import { useUpdateListsOrdersMutation } from '@shared/types/generated/graphql';

const useListDragAndDrop = (list: TasksList) => {
    const [updateListsOrders, { loading: updateListsOrdersLoading }] =
        useUpdateListsOrdersMutation();

    const { currentItem, currentGroup, setGroups } = useTaskDragAndDropContext();
    const { setCurrentOrder, currentOrder, setOrders } = useTaskDragAndDropOrderContext();

    const onListOrder = async (lists: TasksList[]) => {
        if (updateListsOrdersLoading) return;
        const newLists = lists.map(l => ({
            id: l.id,
            order: l.order,
        }));

        await updateListsOrders({ variables: { lists: newLists, boardId: list.board } });
    };

    const { onDragOver, onDrop } = useParentDragAndDrop(
        list,
        {
            currentItem,
            setGroups,
            currentGroup,
        },
        useTaskOnOrder(list.board),
    );

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    } = useOrderDragAndDrop(
        list,
        {
            currentOrder,
            setCurrentOrder,
            setOrders,
        },
        onListOrder,
    );

    return {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        currentOrder,
        onDropOrder,
        onDragOver,
        onDrop,
    };
};

export default useListDragAndDrop;
