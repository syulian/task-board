import { GraphQLError } from 'graphql/error';
import mongoose from 'mongoose';
import dbConnect from '@shared/db/db';
import requireUser from '@shared/db/graphql/utils/requireUser';
import { Board, BoardsGroup, Label, List, Task } from '@shared/db/model';
import { BoardsGroupResolvers, MutationResolvers, QueryResolvers } from '@shared/types';

export const boardsGroupResolvers = {
    Query: {
        getBoardsGroups: (async (_, __, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return BoardsGroup.find({ userId });
        }) satisfies QueryResolvers['getBoardsGroups'],
    },
    Mutation: {
        createBoardsGroup: (async (_, { name, order }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return BoardsGroup.create({ name, order, userId });
        }) satisfies MutationResolvers['createBoardsGroup'],
        deleteBoardsGroup: (async (_, { id }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const group = await BoardsGroup.findOne({ _id: id, userId });
            if (!group) {
                throw new GraphQLError('This group does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const boardsIds = await Board.find({ groupId: id, userId }).distinct('_id');
            if (!boardsIds.length) {
                await BoardsGroup.deleteOne({ _id: id, userId });
                return id;
            }

            const listsIds = await List.find({ board: { $in: boardsIds }, userId }).distinct('_id');
            const session = await mongoose.startSession();

            try {
                await session.withTransaction(async () => {
                    await Task.deleteMany({ list: { $in: listsIds }, userId }, { session });
                    await Label.deleteMany({ board: { $in: boardsIds }, userId }, { session });
                    await List.deleteMany({ board: { $in: boardsIds }, userId }, { session });
                    await Board.deleteMany({ groupId: id, userId }, { session });
                    await BoardsGroup.deleteOne({ _id: id, userId }, { session });
                });
            } catch (e) {
                console.log(e);
                throw new GraphQLError('Failed to delete boards group', {
                    extensions: { code: 'INTERNAL_SERVER_ERROR' },
                });
            } finally {
                await session.endSession();
            }

            return id;
        }) satisfies MutationResolvers['deleteBoardsGroup'],
        updateBoardsGroup: (async (_, { id, name }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const group = await BoardsGroup.findOne({ _id: id, userId });
            if (!group) {
                throw new GraphQLError('This group does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            await BoardsGroup.updateOne({ _id: id, userId }, { $set: { name } });
            return BoardsGroup.findOne({ _id: id, userId });
        }) satisfies MutationResolvers['updateBoardsGroup'],
    },
    BoardsGroup: {
        items: (async (group, _, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return Board.find({ groupId: group.id, userId }) || [];
        }) satisfies BoardsGroupResolvers['items'],
    },
};
