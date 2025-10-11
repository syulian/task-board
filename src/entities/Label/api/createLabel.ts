import { gql } from 'graphql-tag';

export const CREATE_LABEL = gql`
    mutation CreateLabel($name: String!, $color: String!, $order: Int, $board: ID!) {
        createLabel(name: $name, color: $color, order: $order, board: $board) {
            id
            order
            name
            color
            board
        }
    }
`;
