import { GetGroupedTasksQuery } from '@shared/types';

export type IGroupTask = GetGroupedTasksQuery['getGroupedTasks'][number]['tasks'][number];
