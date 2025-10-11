import { gql } from 'graphql-tag';

export const CREATE_LIST = gql`
    mutation CreateList($name: String!, $color: String!, $board: ID!) {
        createList(name: $name, color: $color, board: $board) {
            id
            order
            name
            color
            board
        }
    }
`;
