export function clearTypename<T extends { __typename: string }>(items: T[] | null | undefined) {
    if (!items) return [];
    return items.map(({ __typename, ...item }) => item);
}
