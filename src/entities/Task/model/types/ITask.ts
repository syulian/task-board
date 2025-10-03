import { ISubtask } from '@entities/Task/model/types/ISubtask';

export interface ITask {
    id: string;
    order: number;
    title: string;
    complete?: boolean;
    dueDate?: Date;
    body?: string;
    subtasks?: ISubtask[];
    labels?: string[];
}
