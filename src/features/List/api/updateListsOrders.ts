import { gql } from 'graphql-tag';

export const UPDATE_LISTS_ORDERS = gql`
    mutation UpdateListsOrders($lists: [OrderInput!]!) {
        updateListsOrders(lists: $lists) {
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
            }
        }
    }
`;
