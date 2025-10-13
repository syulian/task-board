import { GraphQLError } from 'graphql/error';
import dbConnect from '@shared/db/db';
import requireUser from '@shared/db/graphql/utils/requireUser';
import { Board, Label } from '@shared/db/model';
import { MutationResolvers, QueryResolvers } from '@shared/types/generated/graphql';

export const labelResolvers = {
    Query: {
        getLabels: (async (_, { boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            return Label.find({ board: boardId, userId });
        }) satisfies QueryResolvers['getLabels'],
    },
    Mutation: {
        createLabel: (async (_, { name, color, order, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            const board = await Board.findOne({ _id: boardId, userId });
            if (!board) {
                throw new GraphQLError('This board does not exist', {
                    extensions: { code: 'FORBIDDEN' },
                });
            }

            return Label.create({ name, color, order, board: boardId, userId });
        }) satisfies MutationResolvers['createLabel'],
        deleteLabel: (async (_, { id }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Label.deleteOne({ _id: id, userId });
            return id;
        }) satisfies MutationResolvers['deleteLabel'],
        updateLabel: (async (_, { id, name, color }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Label.updateOne({ _id: id, userId }, { $set: { name, color } });
            return Label.findOne({ _id: id, userId });
        }) satisfies MutationResolvers['updateLabel'],
        updateLabelsOrders: (async (_, { labels, boardId }, ctx) => {
            const userId = requireUser(ctx?.user);
            await dbConnect();

            await Promise.all(
                labels.map(l =>
                    Label.updateOne({ _id: l.id, userId }, { $set: { order: l.order } }),
                ),
            );

            return Label.find({ boardId, userId });
        }) satisfies MutationResolvers['updateLabelsOrders'],
    },
};
