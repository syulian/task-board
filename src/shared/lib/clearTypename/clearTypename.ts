export function clearTypename<T>(items: T): T {
    if (Array.isArray(items)) {
        return items.map(clearTypename) as T;
    }

    if (items && typeof items === 'object') {
        const obj = items as Record<string, unknown>;
        const newObj: Record<string, unknown> = {};

        for (const key of Object.keys(obj)) {
            if (key === '__typename') continue;
            newObj[key] = clearTypename(obj[key]);
        }

        return newObj as T;
    }

    return items;
}
