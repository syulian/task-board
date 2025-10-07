import { mergeResolvers } from '@graphql-tools/merge';
import { boardResolvers } from '@shared/db/graphql/resolvers/board.resolvers';
import { boardsGroupResolvers } from '@shared/db/graphql/resolvers/boardsGroup.resolvers';
import { labelResolvers } from '@shared/db/graphql/resolvers/label.resolvers';
import { listResolvers } from '@shared/db/graphql/resolvers/list.resolvers';
import { taskResolvers } from '@shared/db/graphql/resolvers/task.resolvers';
import { userResolvers } from '@shared/db/graphql/resolvers/user.resolvers';

export const resolvers = mergeResolvers([
    boardResolvers,
    boardsGroupResolvers,
    labelResolvers,
    listResolvers,
    taskResolvers,
    userResolvers,
]);
