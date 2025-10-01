import { gql } from 'graphql-tag';

export const UPDATE_LABELS_ORDERS = gql`
    mutation UpdateLabelsOrders($labels: [LabelInput!]!) {
        updateLabelsOrders(labels: $labels) {
            id
            name
            color
            boardId
        }
    }
`;
