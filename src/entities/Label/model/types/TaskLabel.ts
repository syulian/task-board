import { GetLabelsQuery } from '@shared/types';

type TaskLabel = GetLabelsQuery['getLabels'][number];
export default TaskLabel;
