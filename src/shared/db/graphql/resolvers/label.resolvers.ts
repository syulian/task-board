import dbConnect from '@shared/db/db';
import { Label } from '@shared/db/model';

export const labelResolvers = {
    Query: {
        getLabels: async (_: any, { board }: { board: string }) => {
            await dbConnect();
            return Label.find({ board });
        },
    },
    Mutation: {
        createLabel: async (
            _: any,
            {
                name,
                color,
                order,
                board,
            }: { name: string; color: string; order: number; board: string },
        ) => {
            await dbConnect();
            return Label.create({ name, color, order, board });
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
