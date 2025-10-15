import { GetListsQuery } from '@shared/types';

type Task = GetListsQuery['getLists'][number]['items'][number];
export default Task;
