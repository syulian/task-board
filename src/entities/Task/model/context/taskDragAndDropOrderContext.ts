import { IListSchema } from '@entities/Task/model/types/IListSchema';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [TaskDragAndDropOrderContext, useTaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<IListSchema>();
