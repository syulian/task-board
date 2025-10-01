import { gql } from 'graphql-tag';

export const DELETE_LABEL = gql`
    mutation DeleteLabel($id: ID!) {
        deleteLabel(id: $id)
    }
`;
