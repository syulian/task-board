import { gql } from 'graphql-tag';

export const CREATE_LABEL = gql`
    mutation CreateLabel($name: String!, $color: String!, $order: Int, $boardId: ID!) {
        createLabel(name: $name, color: $color, order: $order, boardId: $boardId) {
            id
            order
            name
            color
            boardId
        }
    }
`;
