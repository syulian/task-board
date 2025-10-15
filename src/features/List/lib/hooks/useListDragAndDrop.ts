import {
    TasksList,
    useTaskDragAndDropContext,
    useTaskDragAndDropOrderContext,
    useTaskOnOrder,
} from '@entities/Task';
import { useOrderDragAndDrop, useParentDragAndDrop } from '@shared/lib';
import { useUpdateListsOrdersMutation } from '@shared/types';

const useListDragAndDrop = (list: TasksList) => {
    const [updateListsOrders, { loading: updateListsOrdersLoading }] =
        useUpdateListsOrdersMutation();

    const { currentItem, currentGroup, setGroups } = useTaskDragAndDropContext();
    const { setCurrentOrder, currentOrder, setOrders } = useTaskDragAndDropOrderContext();

    const onListOrder = async (lists: TasksList[]) => {
        if (updateListsOrdersLoading) return;

        try {
            const newLists = lists.map(l => ({
                id: l.id,
                order: l.order,
            }));

            await updateListsOrders({ variables: { lists: newLists, boardId: list.board } });
        } catch (e) {
            console.log(e);
        }
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
