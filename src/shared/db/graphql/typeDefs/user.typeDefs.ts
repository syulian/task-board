import { gql } from 'graphql-tag';

export const userTypeDefs = gql`
    type User {
        id: ID!
        name: String!
        email: String!
        password: String!
    }

    extend type Mutation {
        createUser(email: String!, name: String!, password: String!): User!
        deleteUser: ID!
    }
`;
