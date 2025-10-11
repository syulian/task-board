import dbConnect from '@shared/db/db';
import { List, Task } from '@shared/db/model';

export const listResolvers = {
    Query: {
        getLists: async (_: any, { board }: { board: string }) => {
            await dbConnect();

            return List.find({ board });
        },
    },
    Mutation: {
        createList: async (
            _: any,
            { name, color, board }: { name: string; color: string; board: string },
        ) => {
            await dbConnect();
            const listCount = await List.find();

            return List.create({ name, color, order: listCount.length + 1, board });
        },
        deleteList: async (_: any, { id }: { id: string }) => {
            await dbConnect();

            await Task.deleteMany({ list: id });
            await List.deleteOne({ _id: id });

            return id;
        },
        updateList: async (
            _: any,
            {
                id,
                name,
                color,
                board,
            }: { id: string; name?: string; color?: string; board?: string },
        ) => {
            await dbConnect();
            await List.updateOne({ _id: id }, { $set: { name, color, board } });

            return List.findById(id);
        },
        updateListsOrders: async (
            _: any,
            { lists }: { lists: { id: string; order: number }[] },
        ) => {
            await dbConnect();

            await Promise.all(
                lists.map(l => List.updateOne({ _id: l.id }, { $set: { order: l.order } })),
            );

            return List.find();
        },
    },
    List: {
        items: async (list: { id: string; name: string; order: number; board: string }) => {
            await dbConnect();
            return Task.find({ list: list.id }) || [];
        },
    },
};
