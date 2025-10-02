import { IBoard } from '@entities/Board';

export default interface IBoardsGroup {
    id: string;
    order: number;
    name: string;
    items: IBoard[];
}
