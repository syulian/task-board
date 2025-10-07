import { gql } from 'graphql-tag';

export const taskTypeDefs = gql`
    scalar Date

    type Subtask {
        id: ID!
        order: Int
        value: String!
        checked: Boolean
    }

    input SubtaskInput {
        id: String
        order: Int!
        value: String!
        checked: Boolean
    }

    type Task {
        id: ID!
        order: Int
        title: String!
        complete: Boolean
        dueDate: Date
        body: String
        subtasks: [Subtask]
        labels: [Label]
        listId: ID!
    }

    input TaskInput {
        listId: ID!
        title: String!
        dueDate: Date
        body: String
        subtasks: [SubtaskInput]
        labels: [ID]
    }

    input TaskUpdateInput {
        id: ID!
        listId: ID!
        title: String!
        complete: Boolean
        dueDate: Date
        body: String
        subtasks: [SubtaskInput]
        labels: [ID]
    }

    extend type Mutation {
        createTask(task: TaskInput): Task!
        updateTask(task: TaskUpdateInput): Task!
        updateSubtask(taskId: String, subtaskId: String, checked: Boolean): Task!
    }
`;
