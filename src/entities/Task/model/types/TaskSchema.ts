import { SubtaskSchema } from '@entities/Task/model/types/SubtaskSchema';

export interface TaskSchema {
    id: string;
    order: number;
    title: string;
    complete?: boolean;
    body: string;
    subtasks?: SubtaskSchema[];
    labels: {
        name: string;
        color: string;
    }[];
}
