import { ITask } from '@entities/Task';

export interface IListSchema {
    id: string;
    order: number;
    name: string;
    items: ITask[];
}
