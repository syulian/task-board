import { gql } from 'graphql-tag';

export const UPDATE_LIST = gql`
    mutation UpdateList($id: ID!, $name: String, $color: String, $board: ID) {
        updateList(id: $id, name: $name, color: $color, board: $board) {
            id
            order
            name
            color
            board
        }
    }
`;
