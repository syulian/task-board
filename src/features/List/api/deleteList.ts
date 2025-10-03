import { gql } from 'graphql-tag';

export const DELETE_LIST = gql`
    mutation DeleteList($id: ID!) {
        deleteList(id: $id)
    }
`;
