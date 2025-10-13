import { gql } from 'graphql-tag';

export const boardsGroupTypeDefs = gql`
    type BoardsGroup {
        id: ID!
        order: Int!
        name: String!
        items: [Board!]!
        userId: ID!
    }

    extend type Query {
        getBoardsGroups: [BoardsGroup!]!
    }

    extend type Mutation {
        createBoardsGroup(name: String!, order: Int): BoardsGroup!
        deleteBoardsGroup(id: ID!): ID!
        updateBoardsGroup(id: ID!, name: String!): BoardsGroup
    }
`;
