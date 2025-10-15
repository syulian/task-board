import { useLabelDragAndDropOrderContext } from '@entities/Label/model/context/labelDragAndDropOrderContext';
import TaskLabel from '@entities/Label/model/types/TaskLabel';
import { useOrderDragAndDrop } from '@shared/lib';
import { useUpdateLabelsOrdersMutation } from '@shared/types';

const useLabelDragAndDrop = (label: TaskLabel) => {
    const { setCurrentOrder, currentOrder, setOrders } = useLabelDragAndDropOrderContext();
    const [updateOrders, { loading: ordersLoading }] = useUpdateLabelsOrdersMutation({
        refetchQueries: ['GetLabels'],
    });

    const onOrder = async (labels: TaskLabel[]) => {
        if (ordersLoading) return;
        try {
            const newLabels = labels.map(l => ({
                id: l.id,
                order: l.order,
            }));

            await updateOrders({ variables: { labels: newLabels, boardId: label.board } });
        } catch (e) {
            console.log(e);
        }
    };

    const {
        isDragOverOrder,
        onDragOverOrder,
        onDragLeaveOrder,
        onDragStartOrder,
        onDragEndOrder,
        onDropOrder,
    } = useOrderDragAndDrop(
        label,
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
        onDropOrder,
        currentOrder,
    };
};

export default useLabelDragAndDrop;
