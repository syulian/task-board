import Task from '@entities/Task/model/types/Task';
import { useContextMenu } from '@shared/lib';
import {
    useDeleteTaskMutation,
    useUpdateSubtaskMutation,
    useUpdateTaskMutation,
} from '@shared/types/generated/graphql';

const useTaskCard = (task: Task) => {
    const { onContextMenu, menu, setField } = useContextMenu();

    const [updateSubtask, { loading: updateSubtaskLoading }] = useUpdateSubtaskMutation();
    const handleUpdate = async (checked: boolean, subtaskId: string) => {
        if (updateSubtaskLoading) return;

        await updateSubtask({ variables: { taskId: task.id, subtaskId, checked } });
    };

    const [deleteTask] = useDeleteTaskMutation({ refetchQueries: ['GetLists'] });
    const handleDelete = async () => {
        await deleteTask({ variables: { taskId: task.id } });
        setField('state', false);
    };

    const [updateTask] = useUpdateTaskMutation();
    const handleUpdateTask = async () => {
        await updateTask({ variables: { task: { id: task.id, complete: !task.complete } } });
        setField('state', false);
    };

    const contextMenu = [
        {
            children: [
                {
                    label: task.complete ? 'Mark as Incomplete' : 'Mark as Complete',
                    onClick: handleUpdateTask,
                },
                {
                    label: 'Delete',
                    onClick: handleDelete,
                },
            ],
        },
    ];

    return {
        onContextMenu,
        handleUpdate,
        menu,
        contextMenu,
        setField,
    };
};

export default useTaskCard;
