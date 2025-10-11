import { gql } from 'graphql-tag';

export const labelTypeDefs = gql`
    type Label {
        id: ID!
        order: Int
        name: String!
        color: String!
        board: ID!
    }

    extend type Query {
        getLabels(board: ID!): [Label!]!
    }

    extend type Mutation {
        createLabel(name: String!, color: String!, order: Int, board: ID!): Label!
        deleteLabel(id: ID!): ID!
        updateLabel(id: ID!, name: String!, color: String!): Label!
        updateLabelsOrders(labels: [OrderInput!]!): [Label!]!
    }
`;
