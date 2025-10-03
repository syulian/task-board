import { gql } from 'graphql-tag';

export const CREATE_LIST = gql`
    mutation CreateList($name: String!, $color: String!, $boardId: ID!) {
        createList(name: $name, color: $color, boardId: $boardId) {
            id
            order
            name
            color
            boardId
        }
    }
`;
