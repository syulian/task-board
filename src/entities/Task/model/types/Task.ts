import { GetListsQuery } from '@shared/types/generated/graphql';

type Task = GetListsQuery['getLists'][number]['items'][number];
export default Task;
