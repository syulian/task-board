import { GraphQLScalarType, Kind } from 'graphql';

const dateScalar = new GraphQLScalarType({
    name: 'Date',
    description: 'Simple date scalar type',
    serialize(value) {
        if (value instanceof Date) return value.toISOString();
        if (typeof value === 'number') return new Date(value).toISOString();
        if (typeof value === 'string') return new Date(value).toISOString();

        throw Error('GraphQL Date serializer expected `Date`, `number` or `string`');
    },
    parseValue(value) {
        if (typeof value === 'string' || typeof value === 'number') {
            return new Date(value);
        }

        throw new Error('GraphQL Date Scalar parser expected a `number`');
    },
    parseLiteral(ast) {
        if (ast.kind === Kind.STRING || ast.kind === Kind.INT) {
            return new Date(parseInt(ast.value, 10));
        }

        return null;
    },
});

export default dateScalar;
