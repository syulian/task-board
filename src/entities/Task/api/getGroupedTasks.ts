import { gql } from 'graphql-tag';

export const GET_GROUPED_TASKS = gql`
    query GetGroupedTasks {
        getGroupedTasks {
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
