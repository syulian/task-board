import { gql } from 'graphql-tag';

export const DELETE_BOARD = gql`
    mutation DeleteBoard($id: ID!) {
        deleteBoard(id: $id)
    }
`;
