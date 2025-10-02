import { gql } from 'graphql-tag';

export const GET_BOARD = gql`
    query GetBoard($boardId: ID!) {
        getBoard(boardId: $boardId) {
            id
            name
            groupId
        }
    }
`;
