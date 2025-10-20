export function isEnumItem<T extends Record<string, string | number>>(
    myEnum: T,
    value: unknown,
): value is T[keyof T] {
    return Object.values(myEnum).includes(value as T[keyof T]);
}
