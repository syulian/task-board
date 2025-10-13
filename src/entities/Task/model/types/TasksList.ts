import { GetListsQuery } from '@shared/types/generated/graphql';

type TasksList = GetListsQuery['getLists'][number];
export default TasksList;
