import Task from '@entities/Task/model/types/Task';
import TasksList from '@entities/Task/model/types/TasksList';
import { createDragAndDropContext } from '@shared/lib';

export const [TaskDragAndDropContext, useTaskDragAndDropContext] = createDragAndDropContext<
    Task,
    TasksList
>();
