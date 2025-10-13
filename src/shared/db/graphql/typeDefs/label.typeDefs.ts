import { gql } from 'graphql-tag';

export const labelTypeDefs = gql`
    type Label {
        id: ID!
        order: Int!
        name: String!
        color: String!
        board: ID!
        userId: ID!
    }

    extend type Query {
        getLabels(boardId: ID!): [Label!]!
    }

    extend type Mutation {
        createLabel(name: String!, color: String!, order: Int, boardId: ID!): Label!
        deleteLabel(id: ID!): ID!
        updateLabel(id: ID!, name: String!, color: String!): Label
        updateLabelsOrders(labels: [OrderInput!]!, boardId: String!): [Label!]!
    }
`;
