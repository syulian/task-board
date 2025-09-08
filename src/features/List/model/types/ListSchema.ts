import { TaskSchema } from '@entities/Task';

export default interface ListSchema {
    id: string;
    order: number;
    name: string;
    tasks: TaskSchema[];
}
