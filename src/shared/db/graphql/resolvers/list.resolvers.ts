import dbConnect from '@shared/db/db';
import { List, Task } from '@shared/db/model';

export const listResolvers = {
    Query: {
        getLists: async (_: any, { boardId }: { boardId: string }) => {
            await dbConnect();

            return List.find({ boardId });
        },
    },
    Mutation: {
        createList: async (
            _: any,
            { name, color, boardId }: { name: string; color: string; boardId: string },
        ) => {
            await dbConnect();
            const listCount = await List.find();

            return List.create({ name, color, order: listCount.length + 1, boardId });
        },
        deleteList: async (_: any, { id }: { id: string }) => {
            await dbConnect();

            await Task.deleteMany({ listId: id });
            await List.deleteOne({ _id: id });

            return id;
        },
        updateList: async (
            _: any,
            {
                id,
                name,
                color,
                boardId,
            }: { id: string; name?: string; color?: string; boardId?: string },
        ) => {
            await dbConnect();
            await List.updateOne({ _id: id }, { $set: { name, color, boardId } });

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
        items: async (list: { id: string; name: string; order: number; boardId: string }) => {
            await dbConnect();
            return Task.find({ listId: list.id }) || [];
        },
    },
};
