import GroupTask from '@entities/Task/model/types/GroupTask';
import { useContextMenu } from '@shared/lib';
import {
    GetGroupedTasksDocument,
    GetGroupedTasksQuery,
    useUpdateTaskMutation,
} from '@shared/types';

const usePlanned = (task: GroupTask) => {
    const { onContextMenu, menu, setField } = useContextMenu();

    const [updateGroupedTask, { loading }] = useUpdateTaskMutation({
        update(cache, { data }) {
            const updated = data?.updateTask;
            if (!updated) return;

            const existing = cache.readQuery<GetGroupedTasksQuery>({
                query: GetGroupedTasksDocument,
            });
            if (!existing) return;

            const newGroups = existing.getGroupedTasks.map(group => ({
                ...group,
                tasks: group.tasks.map(task =>
                    task.id === updated.id ? { ...task, complete: updated.complete } : task,
                ),
            }));

            cache.writeQuery({
                query: GetGroupedTasksDocument,
                data: { getGroupedTasks: [...newGroups] },
            });
        },
    });
    const handleUpdateTask = async () => {
        if (loading) return;
        try {
            await updateGroupedTask({
                variables: { task: { id: task.id, list: task.list.id, complete: !task.complete } },
            });
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
            ],
        },
    ];

    return {
        onContextMenu,
        menu,
        setField,
        contextMenu,
    };
};

export default usePlanned;
