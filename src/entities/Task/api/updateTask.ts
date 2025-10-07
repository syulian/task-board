import { gql } from 'graphql-tag';

export const UPDATE_TASK = gql`
    mutation UpdateTask($task: TaskUpdateInput) {
        updateTask(task: $task) {
            id
            order
            listId
            title
            dueDate
            body
            subtasks {
                id
                order
                value
                checked
            }
            labels {
                id
                name
                color
            }
            complete
        }
    }
`;
