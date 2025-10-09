import { gql } from 'graphql-tag';

export const GET_TASKS = gql`
    query GetTasks {
        getTasks {
            date
            tasks {
                id
                title
                body
                dueDate
                complete
                board {
                    id
                    name
                }
                list {
                    id
                    name
                }
            }
        }
    }
`;
