import { Types } from 'mongoose';
import dbConnect from '@shared/db/db';
import { dateScalar } from '@shared/db/graphql/scalars';
import { Label, List, Task } from '@shared/db/model';

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
    order?: number;
}

export const taskResolvers = {
    Query: {
        getTasks: async () => {
            await dbConnect();

            const grouped = await Task.aggregate([
                {
                    $match: {
                        dueDate: {
                            $gt: new Date(),
                        },
                    },
                },
                {
                    $lookup: {
                        from: 'lists',
                        localField: 'listId',
                        foreignField: '_id',
                        as: 'list',
                    },
                },
                { $unwind: '$list' },
                {
                    $lookup: {
                        from: 'boards',
                        localField: 'list.boardId',
                        foreignField: '_id',
                        as: 'board',
                    },
                },
                { $unwind: '$board' },
                {
                    $group: {
                        _id: {
                            $dateToString: { format: '%Y-%m-%d', date: '$dueDate' },
                        },
                        tasks: { $push: '$$ROOT' },
                    },
                },
                { $sort: { _id: 1 } },
            ]);

            return grouped.map(g => ({
                date: g._id,
                tasks: g.tasks.map((t: any) => ({
                    id: t._id,
                    title: t.title,
                    body: t.body,
                    dueDate: t.dueDate,
                    complete: t.complete,
                    board: {
                        id: t.board._id,
                        name: t.board.name,
                    },
                    list: {
                        id: t.list._id,
                        name: t.list.name,
                    },
                })),
            }));
        },
    },
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

            await Task.updateOne(
                { _id: taskId, 'subtasks._id': subtaskId },
                { $set: { 'subtasks.$.checked': checked } },
            );

            return Task.findById(taskId);
        },
        deleteTask: async (_: any, { taskId }: { taskId: string }) => {
            await dbConnect();
            await Task.deleteOne({ _id: taskId });

            return taskId;
        },
        updateTasksOrders: async (_: any, { tasks }: { tasks: IUpdateTask[] }) => {
            await dbConnect();
            console.log(tasks);
            await Promise.all(
                tasks.map(t =>
                    Task.updateOne(
                        { _id: t.id },
                        {
                            $set: {
                                order: t.order,
                                listId: t.listId,
                            },
                        },
                    ),
                ),
            );

            return List.find();
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
