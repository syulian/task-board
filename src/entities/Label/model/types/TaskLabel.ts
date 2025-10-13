import { GetLabelsQuery } from '@shared/types/generated/graphql';

type TaskLabel = GetLabelsQuery['getLabels'][number];
export default TaskLabel;
