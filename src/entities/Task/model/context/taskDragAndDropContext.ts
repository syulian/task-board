import { IList } from '@entities/Task/model/types/IList';
import { ITask } from '@entities/Task/model/types/ITask';
import { createDragAndDropContext } from '@shared/lib';

export const [TaskDragAndDropContext, useTaskDragAndDropContext] = createDragAndDropContext<
    ITask,
    IList
>();
