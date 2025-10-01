import { useMutation } from '@apollo/client/react';
import { useLabelDragAndDropOrderContext } from '@entities/Label';
import { UPDATE_LABELS_ORDERS } from '@entities/Label/api/updateLabelsOrders';
import ILabel from '@entities/Label/model/types/ILabel';
import { useOrderDragAndDrop } from '@shared/lib';

const useLabelDragAndDrop = (label: ILabel) => {
    const { setCurrentOrder, currentOrder, setOrders } = useLabelDragAndDropOrderContext();
    const [updateOrders, { loading: ordersLoading }] = useMutation(UPDATE_LABELS_ORDERS, {
        refetchQueries: ['GetLabels'],
    });

    const onOrder = async (labels: ILabel[]) => {
        if (ordersLoading) return;
        const newLabels = labels.map(l => ({
            id: l.id,
            order: l.order,
        }));

        await updateOrders({ variables: { labels: newLabels } });
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
