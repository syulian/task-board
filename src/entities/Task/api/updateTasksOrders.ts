import { gql } from 'graphql-tag';

export const UPDATE_TASKS_ORDERS = gql`
    mutation UpdateTasksOrders($tasks: [TaskUpdateInput]) {
        updateTasksOrders(tasks: $tasks) {
            id
            order
            name
            color
            board
        }
    }
`;
