import { gql } from 'graphql-tag';

export const UPDATE_BOARD = gql`
    mutation UpdateBoard($id: ID!, $name: String!) {
        updateBoard(id: $id, name: $name) {
            id
            name
            order
        }
    }
`;
