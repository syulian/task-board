import { GetGroupedTasksQuery } from '@shared/types';

type GroupTask = GetGroupedTasksQuery['getGroupedTasks'][number]['tasks'][number];
export default GroupTask;
