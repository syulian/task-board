import { TaskSchema } from '@entities/Task';

export interface TasksGroupSchema {
    id: string;
    order: number;
    name: string;
    items: TaskSchema[];
}
