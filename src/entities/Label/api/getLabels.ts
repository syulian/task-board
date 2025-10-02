import { gql } from 'graphql-tag';

export const GET_LABELS = gql`
    query GetLabels($boardId: ID!) {
        getLabels(boardId: $boardId) {
            id
            order
            name
            color
            boardId
        }
    }
`;
