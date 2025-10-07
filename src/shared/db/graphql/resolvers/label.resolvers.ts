import dbConnect from '@shared/db/db';
import { Label } from '@shared/db/model';

export const labelResolvers = {
    Query: {
        getLabels: async (_: any, { boardId }: { boardId: string }) => {
            await dbConnect();
            return Label.find({ boardId });
        },
    },
    Mutation: {
        createLabel: async (
            _: any,
            {
                name,
                color,
                order,
                boardId,
            }: { name: string; color: string; order: number; boardId: string },
        ) => {
            await dbConnect();
            return Label.create({ name, color, order, boardId });
        },
        deleteLabel: async (_: any, { id }: { id: string }) => {
            await dbConnect();
            await Label.deleteOne({ _id: id });

            return id;
        },
        updateLabel: async (
            _: any,
            { id, name, color }: { id: string; name: string; color: string },
        ) => {
            await dbConnect();
            await Label.updateOne({ _id: id }, { $set: { name, color } });

            return Label.findById(id);
        },
        updateLabelsOrders: async (
            _: any,
            { labels }: { labels: { id: string; order: number }[] },
        ) => {
            await dbConnect();

            await Promise.all(
                labels.map(l => Label.updateOne({ _id: l.id }, { $set: { order: l.order } })),
            );

            return Label.find();
        },
    },
};
