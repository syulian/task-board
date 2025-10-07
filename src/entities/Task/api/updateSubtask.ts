import { gql } from 'graphql-tag';

export const UPDATE_SUBTASK = gql`
    mutation UpdateSubtask($taskId: String, $subtaskId: String, $checked: Boolean) {
        updateSubtask(taskId: $taskId, subtaskId: $subtaskId, checked: $checked) {
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
