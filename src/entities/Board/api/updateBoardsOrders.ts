import { gql } from 'graphql-tag';

export const UPDATE_BOARDS_ORDERS = gql`
    mutation UpdateBoardsOrders($boards: [BoardInput!]!) {
        updateBoardsOrders(boards: $boards) {
            id
            name
            order
        }
    }
`;
