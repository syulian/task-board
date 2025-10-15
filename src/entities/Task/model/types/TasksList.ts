import { GetListsQuery } from '@shared/types';

type TasksList = GetListsQuery['getLists'][number];
export default TasksList;
