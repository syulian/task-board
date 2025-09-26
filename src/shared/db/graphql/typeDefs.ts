import { gql } from 'graphql-tag';

export const typeDefs = gql`
    type BoardsGroup {
        id: ID!
        order: Int
        name: String!
        items: [Board]
    }

    type Board {
        id: ID!
        order: Int
        name: String!
        groupId: ID!
    }

    type Label {
        id: ID!
        order: Int
        name: String!
        color: String!
        boardId: ID!
    }

    type List {
        id: ID!
        order: Int
        name: String!
        items: [Task]
        boardId: ID!
    }

    type Task {
        id: ID!
        order: Int
        title: String!
        complete: Boolean
        dueDate: String
        body: String
        subtasks: [Subtask]
        labels: [ID]
        listId: ID!
    }

    type Subtask {
        id: ID!
        order: Int
        value: String!
        checked: Boolean
    }

    input BoardInput {
        id: ID!
        order: Int
        name: String!
        groupId: ID!
    }

    type Query {
        getBoardsGroups: [BoardsGroup!]!
        getBoardByGroupId(groupId: ID!): [Board!]!
    }

    type Mutation {
        createBoard(name: String!, order: Int, groupId: ID!): Board!
        deleteBoard(id: ID!): ID!
        updateBoard(id: ID!, name: String!): Board!
        updateBoardsOrders(boards: [BoardInput!]!): [BoardsGroup!]!
        createBoardsGroup(name: String!, order: Int): BoardsGroup!
    }
`;
