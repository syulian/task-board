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

    type TaskGroupByDate {
        date: Date!
        tasks: [TaskGroup!]!
    }

    type TaskGroup {
        id: ID!
        title: String!
        body: String
        dueDate: Date
        complete: Boolean
        list: List!
        board: Board!
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
        listId: ID
        title: String
        order: Int
        complete: Boolean
        dueDate: Date
        body: String
        subtasks: [SubtaskInput]
        labels: [ID]
    }

    extend type Query {
        getTasks: [TaskGroupByDate]
    }

    extend type Mutation {
        createTask(task: TaskInput): Task!
        updateTask(task: TaskUpdateInput): Task!
        deleteTask(taskId: ID!): ID!
        updateSubtask(taskId: String, subtaskId: String, checked: Boolean): Task!
        updateTasksOrders(tasks: [TaskUpdateInput]): [List!]!
    }
`;
