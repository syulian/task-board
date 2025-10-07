import { gql } from 'graphql-tag';

export const GET_LISTS = gql`
    query GetLists($boardId: ID!) {
        getLists(boardId: $boardId) {
            id
            order
            name
            color
            boardId
            items {
                id
                order
                title
                complete
                dueDate
                body
                listId
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
            }
        }
    }
`;
