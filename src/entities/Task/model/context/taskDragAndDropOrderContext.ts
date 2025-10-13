import TasksList from '@entities/Task/model/types/TasksList';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [TaskDragAndDropOrderContext, useTaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<TasksList>();
