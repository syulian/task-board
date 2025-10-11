import { gql } from 'graphql-tag';

export const GET_TASKS = gql`
    query GetTasks($filters: [String], $labels: [String], $search: String) {
        getTasks(filters: $filters, labels: $labels, search: $search) {
            id
            title
            complete
            dueDate
            body
            list {
                id
                name
            }
        }
    }
`;
