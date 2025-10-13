import TaskLabel from '@entities/Label/model/types/TaskLabel';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [LabelDragAndDropOrderContext, useLabelDragAndDropOrderContext] =
    createDragAndDropOrderContext<TaskLabel>();
