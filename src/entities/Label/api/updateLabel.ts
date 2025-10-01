import { gql } from 'graphql-tag';

export const UPDATE_LABEL = gql`
    mutation UpdateLabel($id: ID!, $name: String!, $color: String!) {
        updateLabel(id: $id, name: $name, color: $color) {
            id
            name
            color
            boardId
        }
    }
`;
