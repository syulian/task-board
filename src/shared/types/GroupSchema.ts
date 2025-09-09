import { ItemSchema } from '@shared/types/index';

export default interface GroupSchema<T extends ItemSchema> {
    id: string;
    order: number;
    items: T[];
}
