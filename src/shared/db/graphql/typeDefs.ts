import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type BoardsGroup {
        id: String!
        name: String!
        order: Int
        items: [Board!]!
    }

    type Board {
        id: String!
        name: String!
        order: Int
        groupId: ID!
    }

    type Query {
        getBoardsGroups: [BoardsGroup!]!
        getBoardByGroupId(groupId: ID!): [Board!]!
    }
`;
