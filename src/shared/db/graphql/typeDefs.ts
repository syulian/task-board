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

    input LabelInput {
        id: ID!
        order: Int
    }

    type List {
        id: ID!
        order: Int
        name: String!
        color: String!
        items: [Task]
        boardId: ID!
    }

    input ListInput {
        id: ID!
        order: Int
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

    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    type Query {
        getBoardsGroups: [BoardsGroup!]!
        getBoard(boardId: ID!): Board!
        getLabels(boardId: ID!): [Label!]!
        getLists(boardId: ID!): [List!]!
    }

    type Mutation {
        createBoard(name: String!, order: Int, groupId: ID!): Board!
        deleteBoard(id: ID!): ID!
        updateBoard(id: ID!, name: String, groupId: ID): Board!
        updateBoardsOrders(boards: [BoardInput!]!): [BoardsGroup!]!
        createBoardsGroup(name: String!, order: Int): BoardsGroup!
        deleteBoardsGroup(id: ID!): ID!
        updateBoardsGroup(id: ID!, name: String!): BoardsGroup!
        createUser(email: String!, name: String!, password: String!): User!
        createLabel(name: String!, color: String!, order: Int, boardId: ID!): Label!
        deleteLabel(id: ID!): ID!
        updateLabel(id: ID!, name: String!, color: String!): Label!
        updateLabelsOrders(labels: [LabelInput!]!): [Label!]!
        createList(name: String!, color: String!, boardId: ID!): List!
        deleteList(id: ID!): ID!
        updateList(id: ID!, name: String, color: String, boardId: ID): List!
        updateListsOrders(lists: [ListInput!]!): [List!]!
    }
`;
