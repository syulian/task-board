import bcrypt from 'bcrypt';
import dbConnect from '@shared/db/db';
import { Board, BoardsGroup, Label, List, Task, User } from '@shared/db/model';

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
        createUser: async (
            _: any,
            { name, email, password }: { name: string; email: string; password: string },
        ) => {
            await dbConnect();
            const exists = await User.findOne({ email });

            if (exists) throw new Error('User already exists');

            const hashed = await bcrypt.hash(password, 10);
            return User.create({ name, email, password: hashed });
        },
    },
    BoardsGroup: {
        items: async (group: { id: string; name: string; order: number }) => {
            await dbConnect();
            return Board.find({ groupId: group.id });
        },
    },
};
