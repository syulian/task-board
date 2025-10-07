import dbConnect from '@shared/db/db';
import { Board, BoardsGroup, Label, List, Task } from '@shared/db/model';

export const boardsGroupResolvers = {
    Query: {
        getBoardsGroups: async () => {
            await dbConnect();
            return BoardsGroup.find();
        },
    },
    Mutation: {
        createBoardsGroup: async (_: any, { name, order }: { name: string; order: number }) => {
            await dbConnect();
            return BoardsGroup.create({ name, order });
        },
        deleteBoardsGroup: async (_: any, { id }: { id: string }) => {
            await dbConnect();

            const boardsIds = await Board.find({ groupId: id }).distinct('_id');
            if (!boardsIds.length) {
                await BoardsGroup.deleteOne({ _id: id });
                return id;
            }

            const listsIds = await List.find({ boardId: { $in: boardsIds } }).distinct('_id');

            await Promise.all([
                Task.deleteMany({ listId: { $in: listsIds } }),
                Label.deleteMany({ boardId: { $in: boardsIds } }),
                List.deleteMany({ boardId: { $in: boardsIds } }),
                Board.deleteMany({ groupId: id }),
                BoardsGroup.deleteOne({ _id: id }),
            ]);

            return id;
        },
        updateBoardsGroup: async (_: any, { id, name }: { id: string; name: string }) => {
            await dbConnect();
            await BoardsGroup.updateOne({ _id: id }, { $set: { name } });

            return BoardsGroup.findById(id);
        },
    },
    BoardsGroup: {
        items: async (group: { id: string; name: string; order: number }) => {
            await dbConnect();
            return Board.find({ groupId: group.id }) || [];
        },
    },
};
