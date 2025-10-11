import { gql } from 'graphql-tag';

export const GET_BOARD = gql`
    query GetBoard($board: ID!) {
        getBoard(board: $board) {
            id
            name
            groupId
        }
    }
`;
