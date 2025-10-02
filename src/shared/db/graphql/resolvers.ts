import bcrypt from 'bcrypt';
import dbConnect from '@shared/db/db';
import { Board, BoardsGroup, Label, List, Task, User } from '@shared/db/model';

export const resolvers = {
    Query: {
        getBoardsGroups: async () => {
            await dbConnect();
            return BoardsGroup.find();
        },
        getBoard: async (_: any, { boardId }: { boardId: string }) => {
            await dbConnect();
            return Board.findById(boardId);
        },
        getLabels: async (_: any, { boardId }: { boardId: string }) => {
            await dbConnect();
            return Label.find({ boardId });
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
            if (!name || !email || !password) {
                throw new Error('Required fields are missing');
            }

            await dbConnect();
            const exists = await User.findOne({ email });

            if (exists) throw new Error('User already exists');

            const hashed = await bcrypt.hash(password, 10);
            return User.create({ name, email, password: hashed });
        },
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
    BoardsGroup: {
        items: async (group: { id: string; name: string; order: number }) => {
            await dbConnect();
            return Board.find({ groupId: group.id });
        },
    },
};
