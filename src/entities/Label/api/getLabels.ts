import { gql } from 'graphql-tag';

export const GET_LABELS = gql`
    query GetLabels($board: ID!) {
        getLabels(board: $board) {
            id
            order
            name
            color
            board
        }
    }
`;
