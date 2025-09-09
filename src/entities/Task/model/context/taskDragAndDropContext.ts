import { TaskSchema } from '@entities/Task/model/types/TaskSchema';
import { TasksGroupSchema } from '@entities/Task/model/types/TasksGroupSchema';
import { createDragAndDropContext } from '@shared/lib';

export const [TaskDragAndDropContext, useTaskDragAndDropContext] = createDragAndDropContext<
    TaskSchema,
    TasksGroupSchema
>();
