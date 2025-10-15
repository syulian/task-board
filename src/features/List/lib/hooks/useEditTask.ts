import { Reference } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Task, TaskSchema, TasksList } from '@entities/Task';
import {
    useCreateTaskMutation,
    useGetLabelsQuery,
    useGetListsQuery,
    useUpdateTaskMutation,
} from '@shared/types';

type TaskValues = z.infer<typeof TaskSchema>;

const useEditTask = (list: TasksList, task?: Task) => {
    const params = useParams<{ id: string }>();
    const boardId = params?.id;

    const [createTask] = useCreateTaskMutation({ refetchQueries: ['GetLists'] });
    const [updateTask] = useUpdateTaskMutation({
        update(cache, { data }) {
            const updated = data?.updateTask;
            if (!updated) return;

            const oldListId = list.id;
            const newListId = updated.list;

            if (oldListId === newListId) return;

            cache.modify({
                id: cache.identify({ __typename: 'List', id: oldListId }),
                fields: {
                    items(existingRefs: readonly Reference[] = [], { readField }) {
                        return existingRefs.filter(ref => readField('id', ref) !== updated.id);
                    },
                },
            });

            cache.modify<{ items: Reference[] }>({
                id: cache.identify({ __typename: 'List', id: newListId }),
                fields: {
                    items(existingRefs: readonly Reference[] = [], { toReference }) {
                        const taskRef = toReference({
                            __typename: 'Task',
                            id: updated.id,
                        });

                        return taskRef ? [...existingRefs, taskRef] : existingRefs;
                    },
                },
            });
        },
    });

    const { data: dataLabels } = useGetLabelsQuery({
        variables: { boardId: boardId ?? '' },
        skip: !boardId,
    });
    const { data: dataLists } = useGetListsQuery({
        variables: { boardId: boardId ?? '' },
        skip: !boardId,
    });

    const labels = dataLabels?.getLabels ?? [];
    const lists =
        dataLists?.getLists.map(l => ({
            id: l.id,
            label: l.name,
        })) ?? [];

    const initialValues = {
        title: task?.title ?? '',
        dueDate: task?.dueDate ? new Date(task.dueDate) : null,
        body: task?.body ?? '',
        subtasks: task?.subtasks ?? [],
        labels: task?.labels?.map(l => l.id) ?? [],
        list: task?.list
            ? (lists.find(s => s.id === task.list) ?? {
                  id: list.id,
                  label: list.name,
              })
            : {
                  id: list.id,
                  label: list.name,
              },
    };

    const {
        reset,
        watch,
        control,
        register,
        setValue,
        getValues,
        handleSubmit,
        formState: { errors, isDirty },
    } = useForm({
        resolver: zodResolver(TaskSchema),
        defaultValues: initialValues,
    });

    const onSubmit = async (data: TaskValues) => {
        const newTask = {
            list: data.list.id,
            title: data.title,
            dueDate: data.dueDate,
            body: data.body,
            subtasks: data.subtasks,
            labels: data.labels,
        };

        if (!task) {
            await createTask({
                variables: { task: newTask },
            });
        } else {
            const { data: dataUpdateTask } = await updateTask({
                variables: {
                    task: {
                        id: task.id,
                        ...newTask,
                    },
                },
            });

            const updatedTask = dataUpdateTask?.updateTask;
            if (!updatedTask) return;

            const newValues = {
                title: updatedTask.title,
                dueDate: updatedTask?.dueDate ? new Date(updatedTask.dueDate) : null,
                body: updatedTask?.body ?? '',
                subtasks:
                    updatedTask?.subtasks?.map(s => ({
                        order: s.order,
                        value: s.value,
                        checked: s.checked,
                    })) ?? [],
                labels: updatedTask?.labels?.map(l => l?.id) ?? [],
                list: lists.find(s => s.id === updatedTask.list) ?? {
                    id: list.id,
                    label: list.name,
                },
            };

            reset({ ...newValues }, { keepDirty: false });
        }
    };

    return {
        form: {
            reset,
            watch,
            control,
            register,
            setValue,
            getValues,
            handleSubmit,
            formState: { errors, isDirty },
        },
        labels,
        lists,
        onSubmit,
    };
};

export default useEditTask;
