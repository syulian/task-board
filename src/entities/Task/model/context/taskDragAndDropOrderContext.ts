import { TaskSchema } from '@entities/Task/model/types/TaskSchema';
import { TasksGroupSchema } from '@entities/Task/model/types/TasksGroupSchema';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [TaskDragAndDropOrderContext, useTaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<TaskSchema, TasksGroupSchema>();
