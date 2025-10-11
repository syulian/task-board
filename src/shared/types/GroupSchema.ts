import ItemSchema from '@shared/types/ItemSchema';

export default interface GroupSchema<T extends ItemSchema> {
    id: string;
    order: number;
    items: T[];
}
