import { gql } from 'graphql-tag';

export const boardTypeDefs = gql`
    type Board {
        id: ID!
        order: Int!
        name: String!
        groupId: ID!
        userId: ID!
    }

    type FullBoard {
        id: ID!
        order: Int!
        name: String!
        groupId: ID!
        userId: ID!
        listsCount: Int
        tasksCount: Int
    }

    input BoardInput {
        id: ID!
        order: Int!
        name: String!
        groupId: ID!
    }

    extend type Query {
        getBoard(id: ID!): FullBoard
    }

    extend type Mutation {
        createBoard(name: String!, order: Int, groupId: ID!): Board!
        deleteBoard(id: ID!): ID!
        updateBoard(id: ID!, name: String, groupId: ID): Board
        updateBoardsOrders(boards: [BoardInput!]!): [BoardsGroup!]!
    }
`;
