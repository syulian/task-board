import { IBoardLink } from '@entities/Board';

export default interface IBoardsGroup {
    id: string;
    order: number;
    name: string;
    items: IBoardLink[];
}
