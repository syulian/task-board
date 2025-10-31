import { GraphQLError } from 'graphql/error';
import dbConnect from '@shared/db/db';
import requireUser from '@shared/db/graphql/utils/requireUser';
import { Board, List, Task } from '@shared/db/model';
import { ListResolvers, MutationResolvers, QueryResolvers } from '@shared/types';

export const listResolvers = {
    Query: {
        getLists: (async (_, { boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return List.find({ board: boardId, userId });
        }) satisfies QueryResolvers['getLists'],
    },
    Mutation: {
        createList: (async (_, { name, color, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const board = await Board.findOne({ _id: boardId, userId });
            if (!board) {
                throw new GraphQLError('This board does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            const listCount = await List.find({ userId });
            return List.create({
                name,
                color,
                order: listCount.length + 1,
                board: boardId,
                userId,
            });
        }) satisfies MutationResolvers['createList'],
        deleteList: (async (_, { id }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Task.deleteMany({ list: id, userId });
            await List.deleteOne({ _id: id, userId });

            return id;
        }) satisfies MutationResolvers['deleteList'],
        updateList: (async (_, { id, name, color, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const board = await Board.findOne({ _id: boardId, userId });
            if (!board) {
                throw new GraphQLError('This board does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            await List.updateOne({ _id: id, userId }, { $set: { name, color, board: boardId } });
            return List.findOne({ _id: id, userId });
        }) satisfies MutationResolvers['updateList'],
        updateListsOrders: (async (_, { lists, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Promise.all(
                lists.map(l => List.updateOne({ _id: l.id, userId }, { $set: { order: l.order } })),
            );

            return List.find({ board: boardId, userId });
        }) satisfies MutationResolvers['updateListsOrders'],
    },
    List: {
        items: (async (list, _, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return Task.find({ list: list.id, userId }) || [];
        }) satisfies ListResolvers['items'],
    },
};
