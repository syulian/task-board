import { useMutation } from '@apollo/client/react';
import { DELETE_TASK } from '@entities/Task/api/deleteTask';
import { UPDATE_SUBTASK } from '@entities/Task/api/updateSubtask';
import { UPDATE_TASK } from '@entities/Task/api/updateTask';
import { ITask } from '@entities/Task/model/types/ITask';
import { useContextMenu } from '@shared/lib';

const useTaskCard = (task: ITask) => {
    const { onContextMenu, menu, setField } = useContextMenu();

    const [updateSubtask, { loading: updateSubtaskLoading }] = useMutation(UPDATE_SUBTASK);
    const handleUpdate = async (checked: boolean, subtaskId: string) => {
        if (updateSubtaskLoading) return;

        await updateSubtask({ variables: { taskId: task.id, subtaskId, checked } });
    };

    const [deleteTask] = useMutation(DELETE_TASK, { refetchQueries: ['GetLists'] });
    const handleDelete = async () => {
        await deleteTask({ variables: { taskId: task.id } });
        setField('state', false);
    };

    const [updateTask] = useMutation(UPDATE_TASK);
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
