import { ISubtask } from '@entities/Task/model/types/ISubtask';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [SubtaskDragAndDropOrderContext, useSubtaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<ISubtask>();
