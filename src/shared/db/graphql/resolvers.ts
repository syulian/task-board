import dbConnect from '@shared/db/db';
import Board from '@shared/db/model/Board';
import BoardsGroup from '@shared/db/model/BoardsGroup';
import Label from '@shared/db/model/Label';
import List from '@shared/db/model/List';
import Task from '@shared/db/model/Task';

export const resolvers = {
    Query: {
        getBoardsGroups: async () => {
            await dbConnect();
            return BoardsGroup.find();
        },
        getBoardByGroupId: async (_: any, { groupId }: { groupId: string }) => {
            await dbConnect();
            return Board.find({ groupId });
        },
    },
    Mutation: {
        createBoard: async (
            _: any,
            { name, order, groupId }: { name: string; order: number; groupId: string },
        ) => {
            await dbConnect();
            return Board.create({ name, order, groupId });
        },
        deleteBoard: async (_: any, { id }: { id: string }) => {
            await dbConnect();
            const listsIds = await List.find({ boardId: id }).distinct('_id');

            await Task.deleteMany({ listId: { $in: listsIds } });
            await Label.deleteMany({ boardId: id });
            await List.deleteMany({ boardId: id });
            await Board.deleteOne({ _id: id });

            return id;
        },
        updateBoard: async (_: any, { id, name }: { id: string; name: string }) => {
            await dbConnect();
            await Board.updateOne({ _id: id }, { $set: { name } });

            return Board.findById(id);
        },
        updateBoardsOrders: async (
            _: any,
            {
                boards,
            }: {
                boards: {
                    id: string;
                    name: string;
                    order: number;
                    groupId: string;
                }[];
            },
        ) => {
            await dbConnect();

            await Promise.all(
                boards.map(b =>
                    Board.updateOne(
                        { _id: b.id },
                        {
                            $set: {
                                order: b.order,
                                groupId: b.groupId,
                            },
                        },
                    ),
                ),
            );

            return BoardsGroup.find();
        },
        createBoardsGroup: async (_: any, { name, order }: { name: string; order: number }) => {
            await dbConnect();
            return BoardsGroup.create({ name, order });
        },
    },
    BoardsGroup: {
        items: async (group: { id: string; name: string; order: number }) => {
            await dbConnect();
            return Board.find({ groupId: group.id });
        },
    },
};
