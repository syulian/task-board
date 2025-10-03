import { useMutation } from '@apollo/client/react';
import { UPDATE_LISTS_ORDERS } from '@features/List/api/updateListsOrders';
import { IList, useTaskDragAndDropContext, useTaskDragAndDropOrderContext } from '@entities/Task';
import { useOrderDragAndDrop, useParentDragAndDrop } from '@shared/lib';

const useListDragAndDrop = (list: IList) => {
    const [updateListsOrders, { loading: updateListsOrdersLoading }] =
        useMutation(UPDATE_LISTS_ORDERS);

    const { currentItem, currentGroup, setGroups } = useTaskDragAndDropContext();
    const { setCurrentOrder, currentOrder, setOrders } = useTaskDragAndDropOrderContext();

    const { onDragOver, onDrop } = useParentDragAndDrop(list, {
        currentItem,
        setGroups,
        currentGroup,
    });

    const onOrder = async (lists: IList[]) => {
        if (updateListsOrdersLoading) return;
        const newLists = lists.map(l => ({
            id: l.id,
            order: l.order,
        }));

        await updateListsOrders({ variables: { lists: newLists } });
    };

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
        onOrder,
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
