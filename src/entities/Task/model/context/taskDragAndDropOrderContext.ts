import { IList } from '@entities/Task/model/types/IList';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [TaskDragAndDropOrderContext, useTaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<IList>();
