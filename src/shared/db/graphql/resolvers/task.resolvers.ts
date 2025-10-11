import { Types } from 'mongoose';
import dbConnect from '@shared/db/db';
import { dateScalar } from '@shared/db/graphql/scalars';
import { Label, List, Task } from '@shared/db/model';

interface ITask {
    list: string;
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
        getTasks: async (
            _: any,
            {
                filters,
                labels,
                search,
            }: {
                filters?: string[];
                labels?: string[];
                search?: string;
            },
        ) => {
            await dbConnect();

            const query: {
                labels?: object;
                dueDate?: object;
                complete?: boolean;
                $or?: object[];
            } = {};

            filters?.forEach(f => {
                switch (f) {
                    case 'NO_LABEL':
                        query.labels = { $exists: true, $size: 0 };
                        break;
                    case 'DUE_DATE':
                        query.dueDate = { $exists: true, $ne: null };
                        break;
                    case 'COMPLETE':
                        query.complete = true;
                        break;
                }
            });

            if (search) {
                query.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { body: { $regex: search, $options: 'i' } },
                ];
            }

            if (labels && labels?.length > 0) {
                query.labels = { $in: labels };
            }

            return Task.find(query).populate('list');
        },
        getGroupedTasks: async () => {
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
                        localField: 'list',
                        foreignField: '_id',
                        as: 'list',
                    },
                },
                { $unwind: '$list' },
                {
                    $lookup: {
                        from: 'boards',
                        localField: 'list.board',
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
                        ...t.board,
                    },
                    list: {
                        id: t.list._id,
                        ...t.list,
                    },
                })),
            }));
        },
    },
    Mutation: {
        createTask: async (_: any, { task }: { task: ITask }) => {
            await dbConnect();

            const id = new Types.ObjectId();
            const { list, title, dueDate, body, subtasks, labels } = task;
            const taskCount = await Task.countDocuments({ list });

            const newSubtasks = subtasks?.map(s => ({
                _id: new Types.ObjectId(),
                ...s,
            }));

            return await Task.create({
                id: id,
                order: taskCount + 1,
                complete: false,
                list,
                title,
                dueDate,
                body,
                subtasks: newSubtasks ?? [],
                labels,
            });
        },
        updateTask: async (_: any, { task }: { task: IUpdateTask }) => {
            await dbConnect();

            const { id, complete, list, title, dueDate, body, subtasks, labels } = task;
            const newSubtasks = subtasks?.map(s => ({
                _id: s.id ?? new Types.ObjectId(),
                ...s,
            }));

            await Task.updateOne(
                { _id: id },
                {
                    $set: {
                        complete,
                        list,
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

            await Promise.all(
                tasks.map(t =>
                    Task.updateOne(
                        { _id: t.id },
                        {
                            $set: {
                                order: t.order,
                                list: t.list,
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
