import { useMutation } from '@apollo/client/react';
import { UPDATE_LISTS_ORDERS } from '@features/List/api/updateListsOrders';
import { IList, useTaskDragAndDropContext, useTaskDragAndDropOrderContext } from '@entities/Task';
import useTaskOnOrder from '@entities/Task/lib/hooks/useTaskOnOrder';
import { useOrderDragAndDrop, useParentDragAndDrop } from '@shared/lib';

const useListDragAndDrop = (list: IList) => {
    const [updateListsOrders, { loading: updateListsOrdersLoading }] =
        useMutation(UPDATE_LISTS_ORDERS);

    const { currentItem, currentGroup, setGroups } = useTaskDragAndDropContext();
    const { setCurrentOrder, currentOrder, setOrders } = useTaskDragAndDropOrderContext();

    const onListOrder = async (lists: IList[]) => {
        if (updateListsOrdersLoading) return;
        const newLists = lists.map(l => ({
            id: l.id,
            order: l.order,
        }));

        await updateListsOrders({ variables: { lists: newLists } });
    };

    const { onDragOver, onDrop } = useParentDragAndDrop(
        list,
        {
            currentItem,
            setGroups,
            currentGroup,
        },
        useTaskOnOrder(),
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
