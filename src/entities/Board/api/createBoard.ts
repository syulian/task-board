import { gql } from 'graphql-tag';

export const CREATE_BOARD = gql`
    mutation CreateBoard($name: String!, $order: Int, $groupId: ID!) {
        createBoard(name: $name, order: $order, groupId: $groupId) {
            id
            order
            name
            groupId
        }
    }
`;
