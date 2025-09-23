import dbConnect from '@shared/db/db';
import Board from '@shared/db/model/board/Board';
import BoardsGroup from '@shared/db/model/board/BoardsGroup';

export const resolvers = {
    Query: {
        getBoardsGroups: async () => {
            await dbConnect();
            return BoardsGroup.find({});
        },
        getBoardByGroupId: async (_: any, { groupId }: { groupId: string }) => {
            await dbConnect();
            return Board.find({ groupId });
        },
    },
    BoardsGroup: {
        items: async (group: { id: string; name: string; order: number }) => {
            await dbConnect();
            return Board.find({ groupId: group.id });
        },
    },
};
