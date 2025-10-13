import TasksList from '@entities/Task/model/types/TasksList';
import { clearTypename } from '@shared/lib';
import { useUpdateTasksOrdersMutation } from '@shared/types/generated/graphql';

const useTaskOnOrder = (boardId: string) => {
    const [updateOrders, { loading: ordersLoading }] = useUpdateTasksOrdersMutation({
        refetchQueries: ['GetLists'],
    });

    return async (lists: TasksList[]) => {
        if (ordersLoading) return;
        const tasks = clearTypename(lists.flatMap(g => g.items.map(b => ({ ...b, list: g.id }))));

        const cleanedTasks = tasks.map(t => ({
            ...t,
            labels: t.labels?.map(l => l.id),
        }));

        await updateOrders({ variables: { tasks: cleanedTasks, boardId } });
    };
};

export default useTaskOnOrder;
