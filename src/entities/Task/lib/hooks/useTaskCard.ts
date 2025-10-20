import Task from '@entities/Task/model/types/Task';
import { useContextMenu } from '@shared/lib';
import {
    useDeleteTaskMutation,
    useUpdateSubtaskMutation,
    useUpdateTaskMutation,
} from '@shared/types';

const useTaskCard = (task: Task) => {
    const { onContextMenu, menu, setField } = useContextMenu();

    const [updateSubtask, { loading: updateSubtaskLoading }] = useUpdateSubtaskMutation();
    const handleUpdate = async (checked: boolean, subtaskId: string) => {
        if (updateSubtaskLoading) return;

        try {
            await updateSubtask({ variables: { taskId: task.id, subtaskId, checked } });
        } catch (e) {
            console.error(e);
        }
    };

    const [deleteTask] = useDeleteTaskMutation({ refetchQueries: ['GetLists'] });
    const handleDelete = async () => {
        try {
            await deleteTask({ variables: { taskId: task.id } });
        } catch (e) {
            console.error(e);
        } finally {
            setField('state', false);
        }
    };

    const [updateTask, { loading: updateTaskLoading }] = useUpdateTaskMutation();
    const handleUpdateTask = async () => {
        if (updateTaskLoading) return;

        try {
            await updateTask({ variables: { task: { id: task.id, complete: !task.complete } } });
        } catch (e) {
            console.error(e);
        } finally {
            setField('state', false);
        }
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
