import { TasksGroupSchema } from '@entities/Task/model/types/TasksGroupSchema';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [TaskDragAndDropOrderContext, useTaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<TasksGroupSchema>();
