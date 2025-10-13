import { GetGroupedTasksQuery } from '@shared/types/generated/graphql';

export type IFullTask = GetGroupedTasksQuery['getGroupedTasks'][number]['tasks'][number];

export interface IGroupTask {
    date: Date;
    tasks: IFullTask[];
}
