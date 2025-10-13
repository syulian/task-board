import { gql } from 'graphql-tag';

export const listTypeDefs = gql`
    type List {
        id: ID!
        order: Int!
        name: String!
        color: String!
        items: [Task!]!
        board: ID!
        userId: ID!
    }

    input OrderInput {
        id: ID!
        order: Int
    }

    extend type Query {
        getLists(boardId: ID!): [List!]!
    }

    extend type Mutation {
        createList(name: String!, color: String!, boardId: ID!): List!
        deleteList(id: ID!): ID!
        updateList(id: ID!, name: String, color: String, boardId: ID!): List
        updateListsOrders(lists: [OrderInput!]!, boardId: String!): [List!]!
    }
`;
