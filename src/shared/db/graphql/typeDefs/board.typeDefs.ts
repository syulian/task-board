import { gql } from 'graphql-tag';

export const boardTypeDefs = gql`
    type Board {
        id: ID!
        order: Int
        name: String!
        groupId: ID!
    }

    input BoardInput {
        id: ID!
        order: Int
        name: String!
        groupId: ID!
    }

    extend type Query {
        getBoard(boardId: ID!): Board!
    }

    extend type Mutation {
        createBoard(name: String!, order: Int, groupId: ID!): Board!
        deleteBoard(id: ID!): ID!
        updateBoard(id: ID!, name: String, groupId: ID): Board!
        updateBoardsOrders(boards: [BoardInput!]!): [BoardsGroup!]!
    }
`;
