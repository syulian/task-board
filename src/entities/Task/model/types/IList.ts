import { ITask } from '@entities/Task/model/types/ITask';

export interface IList {
    id: string;
    order: number;
    name: string;
    color: string;
    items: ITask[];
    board: string;
}
