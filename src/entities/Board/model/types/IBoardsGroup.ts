import IBoard from '@entities/Board/model/types/IBoard';

export default interface IBoardsGroup {
    id: string;
    order: number;
    name: string;
    items: IBoard[];
}
