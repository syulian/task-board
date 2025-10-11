import { gql } from 'graphql-tag';

export const UPDATE_LABELS_ORDERS = gql`
    mutation UpdateLabelsOrders($labels: [OrderInput!]!) {
        updateLabelsOrders(labels: $labels) {
            id
            name
            color
            board
        }
    }
`;
