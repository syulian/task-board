import { SubtaskSchema } from '@entities/Task/model/types/SubtaskSchema';

export interface ITask {
    id: string;
    order: number;
    title: string;
    complete?: boolean;
    dueDate?: Date;
    body: string;
    subtasks?: SubtaskSchema[];
    labels: {
        name: string;
        color: string;
    }[];
}
