import { Types } from 'mongoose';
import dbConnect from '@shared/db/db';
import { dateScalar } from '@shared/db/graphql/scalars';
import { Label, Task } from '@shared/db/model';

interface ITask {
    listId: string;
    title: boolean;
    dueDate?: Date;
    body?: string;
    subtasks?: {
        id?: string;
        order: number;
        value: string;
        checked?: boolean;
    }[];
    labels?: string[];
}

interface IUpdateTask extends ITask {
    id: string;
    complete?: boolean;
}

export const taskResolvers = {
    Mutation: {
        createTask: async (_: any, { task }: { task: ITask }) => {
            await dbConnect();

            const id = new Types.ObjectId();
            const { listId, title, dueDate, body, subtasks, labels } = task;
            const taskCount = await Task.countDocuments({ listId });

            const newSubtasks = subtasks?.map(s => ({
                _id: new Types.ObjectId(),
                ...s,
            }));

            return await Task.create({
                id: id,
                order: taskCount + 1,
                complete: false,
                listId,
                title,
                dueDate,
                body,
                subtasks: newSubtasks ?? [],
                labels,
            });
        },
        updateTask: async (_: any, { task }: { task: IUpdateTask }) => {
            await dbConnect();

            const { id, complete, listId, title, dueDate, body, subtasks, labels } = task;
            const newSubtasks = subtasks?.map(s => ({
                _id: s.id ?? new Types.ObjectId(),
                ...s,
            }));

            await Task.updateOne(
                { _id: id },
                {
                    $set: {
                        complete,
                        listId,
                        title,
                        dueDate,
                        body,
                        subtasks: newSubtasks,
                        labels,
                    },
                },
            );

            return Task.findById(id);
        },
        updateSubtask: async (
            _: any,
            { taskId, subtaskId, checked }: { taskId: string; subtaskId: string; checked: boolean },
        ) => {
            await dbConnect();
            console.log(taskId, subtaskId, checked);
            await Task.updateOne(
                { _id: taskId, 'subtasks.id': subtaskId },
                { $set: { 'subtasks.$.checked': checked } },
            );

            console.log(await Task.findOne({ _id: taskId, 'subtasks.id': subtaskId }));

            return Task.findById(taskId);
        },
    },
    Task: {
        labels: async (task: ITask) => {
            await dbConnect();
            return task.labels?.length ? Label.find({ _id: { $in: task.labels } }) : [];
        },
    },
    Date: dateScalar,
};
