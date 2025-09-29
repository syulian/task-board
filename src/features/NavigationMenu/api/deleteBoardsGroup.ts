import { gql } from 'graphql-tag';

export const DELETE_BOARDS_GROUP = gql`
    mutation DeleteBoardsGroup($id: ID!) {
        deleteBoardsGroup(id: $id)
    }
`;
