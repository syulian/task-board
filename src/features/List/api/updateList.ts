import { gql } from 'graphql-tag';

export const UPDATE_LIST = gql`
    mutation UpdateList($id: ID!, $name: String, $color: String, $boardId: ID) {
        updateList(id: $id, name: $name, color: $color, boardId: $boardId) {
            id
            order
            name
            color
            boardId
        }
    }
`;
