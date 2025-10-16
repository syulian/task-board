import { GraphQLError } from 'graphql/error';
import mongoose from 'mongoose';
import dbConnect from '@shared/db/db';
import requireUser from '@shared/db/graphql/utils/requireUser';
import { Board, BoardsGroup, Label, List, Task } from '@shared/db/model';
import { QueryResolvers, MutationResolvers } from '@shared/types';

export const boardResolvers = {
    Query: {
        getBoard: (async (_, { id }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const listsCount = await List.countDocuments({ board: id, userId });

            const listsIds = await List.find({ board: id, userId }).distinct('_id');
            const tasksCount = listsIds.length
                ? await Task.countDocuments({ list: { $in: listsIds }, userId })
                : 0;

            const board = await Board.findOne({ _id: id, userId });
            const boardId = board._id;

            delete board._id;
            return {
                ...board.toObject(),
                id: boardId,
                listsCount,
                tasksCount,
            };
        }) satisfies QueryResolvers['getBoard'],
    },
    Mutation: {
        createBoard: (async (_, { name, order, groupId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const group = await BoardsGroup.findOne({ _id: groupId, userId });
            if (!group) {
                throw new GraphQLError('This group does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            return Board.create({ name, order, groupId, userId });
        }) satisfies MutationResolvers['createBoard'],
        deleteBoard: (async (_, { id }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const board = await Board.findOne({ _id: id, userId });
            if (!board) {
                throw new GraphQLError('This board does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const listsIds = await List.find({ board: id, userId }).distinct('_id');

            if (!listsIds.length) {
                await Board.deleteOne({ _id: id, userId });
                return id;
            }

            const session = await mongoose.startSession();
            try {
                await session.withTransaction(async () => {
                    await Task.deleteMany({ list: { $in: listsIds }, userId });
                    await Label.deleteMany({ board: id, userId });
                    await List.deleteMany({ board: id, userId });
                    await Board.deleteOne({ _id: id, userId });
                });
            } catch (e) {
                console.log(e);
                throw new GraphQLError('Failed to delete board', {
                    extensions: { code: 'INTERNAL_SERVER_ERROR' },
                });
            } finally {
                await session.endSession();
            }

            return id;
        }) satisfies MutationResolvers['deleteBoard'],
        updateBoard: (async (_, { id, name, groupId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const board = await Board.findOne({ _id: id, userId });
            if (!board) {
                throw new GraphQLError('This board does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            await Board.updateOne({ _id: id, userId }, { $set: { name, groupId } });
            return Board.findOne({ _id: id, userId });
        }) satisfies MutationResolvers['updateBoard'],
        updateBoardsOrders: (async (_, { boards }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Promise.all(
                boards.map(b =>
                    Board.updateOne(
                        { _id: b.id, userId },
                        {
                            $set: {
                                order: b.order,
                                groupId: b.groupId,
                            },
                        },
                    ),
                ),
            );

            return BoardsGroup.find({ userId });
        }) satisfies MutationResolvers['updateBoardsOrders'],
    },
};
