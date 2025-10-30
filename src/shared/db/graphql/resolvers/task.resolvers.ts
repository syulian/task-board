import { GraphQLError } from 'graphql/error';
import { ObjectId } from 'mongodb';
import { Types } from 'mongoose';
import dbConnect from '@shared/db/db';
import { dateScalar } from '@shared/db/graphql/scalars';
import requireUser from '@shared/db/graphql/utils/requireUser';
import { Label, List, Task } from '@shared/db/model';
import { MutationResolvers, QueryResolvers, TaskResolvers } from '@shared/types';

export const taskResolvers = {
    Query: {
        getTasks: (async (_, { filters, labels, search, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const lists = await List.find({ board: boardId, userId }).distinct('_id');

            const query: {
                labels?: object;
                dueDate?: object;
                complete?: boolean;
                $or?: object[];
                list: object;
            } = { list: { $in: lists } };

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

            return Task.find({ ...query, userId }).populate('list');
        }) satisfies QueryResolvers['getTasks'],
        getGroupedTasks: (async (_, __, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return Task.aggregate([
                {
                    $match: {
                        userId: new ObjectId(userId),
                        dueDate: { $gt: new Date() },
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
                        tasks: {
                            $push: {
                                id: '$_id',
                                title: '$title',
                                body: '$body',
                                dueDate: '$dueDate',
                                complete: '$complete',
                                board: {
                                    id: '$board._id',
                                    name: '$board.name',
                                },
                                list: {
                                    id: '$list._id',
                                    name: '$list.name',
                                    board: '$list.board',
                                },
                            },
                        },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        date: '$_id',
                        tasks: 1,
                    },
                },
                { $sort: { date: 1 } },
            ]);
        }) satisfies QueryResolvers['getGroupedTasks'],
    },
    Mutation: {
        createTask: (async (_, { task }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const id = new Types.ObjectId();
            const { list, title, dueDate, body, subtasks, labels } = task;

            const listExists = await List.findOne({ _id: list, userId });
            if (!listExists) {
                throw new GraphQLError('This list does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const taskCount = await Task.countDocuments({ list, userId });

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
                userId,
            });
        }) satisfies MutationResolvers['createTask'],
        updateTask: (async (_, { task }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const { id, complete, list, title, dueDate, body, subtasks, labels } = task;

            const listExists = await List.findOne({ _id: list, userId });
            if (!listExists) {
                throw new GraphQLError('This list does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const newSubtasks = subtasks?.map(s => ({
                _id: s.id ?? new Types.ObjectId(),
                ...s,
            }));

            await Task.updateOne(
                { _id: id, userId },
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

            return Task.findOne({ _id: id, userId });
        }) satisfies MutationResolvers['updateTask'],
        updateSubtask: (async (_, { taskId, subtaskId, checked }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Task.updateOne(
                { _id: taskId, userId, 'subtasks._id': subtaskId },
                { $set: { 'subtasks.$.checked': checked } },
            );

            return Task.findOne({ _id: taskId, userId });
        }) satisfies MutationResolvers['updateSubtask'],
        deleteTask: (async (_, { taskId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Task.deleteOne({ _id: taskId, userId });
            return taskId;
        }) satisfies MutationResolvers['deleteTask'],
        updateTasksOrders: (async (_, { tasks, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Promise.all(
                tasks.map(t =>
                    Task.updateOne(
                        { _id: t.id, userId },
                        {
                            $set: {
                                order: t.order,
                                list: t.list,
                            },
                        },
                    ),
                ),
            );

            return List.find({ boardId, userId });
        }) satisfies MutationResolvers['updateTasksOrders'],
    },
    Task: {
        labels: (async (task, _, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return Label.find({ _id: { $in: task.labels }, userId }) ?? [];
        }) satisfies TaskResolvers['labels'],
    },
    Date: dateScalar,
};
