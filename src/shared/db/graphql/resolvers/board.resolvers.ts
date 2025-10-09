import dbConnect from '@shared/db/db';
import { Board, BoardsGroup, Label, List, Task } from '@shared/db/model';

export const boardResolvers = {
    Query: {
        getBoard: async (_: any, { boardId }: { boardId: string }) => {
            await dbConnect();
            return Board.findById(boardId);
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

            if (!listsIds.length) {
                await Board.deleteOne({ _id: id });
                return id;
            }

            await Promise.all([
                Task.deleteMany({ listId: { $in: listsIds } }),
                Label.deleteMany({ boardId: id }),
                List.deleteMany({ boardId: id }),
                Board.deleteOne({ _id: id }),
            ]);

            return id;
        },
        updateBoard: async (
            _: any,
            { id, name, groupId }: { id: string; name?: string; groupId?: string },
        ) => {
            await dbConnect();
            await Board.updateOne({ _id: id }, { $set: { name, groupId } });

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
    },
};
