import { BoardItemSchema } from '@entities/Board';

export default interface BoardsGroupSchema {
    id: string;
    name: string;
    boards: BoardItemSchema[];
}
