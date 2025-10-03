import { ITask } from '@entities/Task';

export interface IList {
    id: string;
    order: number;
    name: string;
    color: string;
    items: ITask[];
    boardId: string;
}
