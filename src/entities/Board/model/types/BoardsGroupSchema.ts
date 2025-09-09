import { BoardLinkSchema } from '@entities/Board';

export default interface BoardsGroupSchema {
    id: string;
    order: number;
    name: string;
    items: BoardLinkSchema[];
}
