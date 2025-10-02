import { gql } from 'graphql-tag';

export const UPDATE_BOARD = gql`
    mutation UpdateBoard($id: ID!, $name: String, $groupId: ID) {
        updateBoard(id: $id, name: $name, groupId: $groupId) {
            id
            name
            order
        }
    }
`;
