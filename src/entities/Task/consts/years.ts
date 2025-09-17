export const YEARS = Array.from({ length: 100 }, (_, i) => {
    const year = (2000 + i).toString();
    return { id: year, label: year };
});
