import { gql } from 'graphql-tag';

export const CREATE_TASK = gql`
    mutation CreateTask($task: TaskInput) {
        createTask(task: $task) {
            id
            order
            list
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
