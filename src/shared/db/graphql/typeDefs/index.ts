import { mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'graphql-tag';
import { boardTypeDefs } from '@shared/db/graphql/typeDefs/board.typeDefs';
import { boardsGroupTypeDefs } from '@shared/db/graphql/typeDefs/boardsGroup.typeDefs';
import { labelTypeDefs } from '@shared/db/graphql/typeDefs/label.typeDefs';
import { listTypeDefs } from '@shared/db/graphql/typeDefs/list.typeDefs';
import { taskTypeDefs } from '@shared/db/graphql/typeDefs/task.typeDefs';
import { userTypeDefs } from '@shared/db/graphql/typeDefs/user.typeDefs';

export const typeDefs = mergeTypeDefs([
    gql`
        type Query
        type Mutation
    `,
    boardTypeDefs,
    boardsGroupTypeDefs,
    labelTypeDefs,
    listTypeDefs,
    taskTypeDefs,
    userTypeDefs,
]);
