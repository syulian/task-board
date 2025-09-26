import { ITask } from '@entities/Task/model/types/ITask';
import { IListSchema } from '@entities/Task/model/types/IListSchema';
import { createDragAndDropContext } from '@shared/lib';

export const [TaskDragAndDropContext, useTaskDragAndDropContext] = createDragAndDropContext<
    ITask,
    IListSchema
>();
