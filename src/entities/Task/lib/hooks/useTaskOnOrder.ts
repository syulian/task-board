import { useMutation } from '@apollo/client/react';
import { UPDATE_TASKS_ORDERS } from '@entities/Task/api/updateTasksOrders';
import { IList } from '@entities/Task/model/types/IList';
import { clearTypename } from '@shared/lib';

const useTaskOnOrder = () => {
    const [updateOrders, { loading: ordersLoading }] = useMutation<{ updateTasksOrders: IList[] }>(
        UPDATE_TASKS_ORDERS,
        { refetchQueries: ['GetLists'] },
    );

    return async (lists: IList[]) => {
        if (ordersLoading) return;
        const tasks = clearTypename(lists.flatMap(g => g.items.map(b => ({ ...b, list: g.id }))));

        const cleanedTasks = tasks.map(t => ({
            ...t,
            labels: t.labels?.map(l => l.id),
        }));

        await updateOrders({ variables: { tasks: cleanedTasks } });
    };
};

export default useTaskOnOrder;
