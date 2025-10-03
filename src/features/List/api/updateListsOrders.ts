import { gql } from 'graphql-tag';

export const UPDATE_LISTS_ORDERS = gql`
    mutation UpdateListsOrders($lists: [ListInput!]!) {
        updateListsOrders(lists: $lists) {
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
            }
        }
    }
`;
