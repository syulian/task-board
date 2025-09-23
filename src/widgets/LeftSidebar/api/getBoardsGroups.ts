import { gql } from 'graphql-tag';

export const GET_BOARDS_GROUPS = gql`
    query GetBoardsGroups {
        getBoardsGroups {
            id
            order
            name
            items {
                id
                order
                name
            }
        }
    }
`;
