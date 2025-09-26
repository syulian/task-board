import { gql } from 'graphql-tag';

export const CREATE_BOARDS_GROUP = gql`
    mutation CreateBoardsGroup($name: String!, $order: Int) {
        createBoardsGroup(name: $name, order: $order) {
            id
            order
            name
        }
    }
`;
