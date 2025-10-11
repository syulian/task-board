import { gql } from 'graphql-tag';

export const GET_LISTS = gql`
    query GetLists($board: ID!) {
        getLists(board: $board) {
            id
            order
            name
            color
            board
            items {
                id
                order
                title
                complete
                dueDate
                body
                list
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
