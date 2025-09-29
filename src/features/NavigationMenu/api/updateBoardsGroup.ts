import { gql } from 'graphql-tag';

export const UPDATE_BOARDS_GROUP = gql`
    mutation UpdateBoardsGroup($id: ID!, $name: String!) {
        updateBoardsGroup(id: $id, name: $name) {
            id
            name
            order
        }
    }
`;
