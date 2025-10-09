import { gql } from 'graphql-tag';

export const DELETE_TASK = gql`
    mutation DeleteTask($taskId: ID!) {
        deleteTask(taskId: $taskId)
    }
`;
