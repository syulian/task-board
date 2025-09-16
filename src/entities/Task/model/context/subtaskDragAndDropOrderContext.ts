import { SubtaskSchema } from '@entities/Task/model/types/SubtaskSchema';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [SubtaskDragAndDropOrderContext, useSubtaskDragAndDropOrderContext] =
    createDragAndDropOrderContext<SubtaskSchema>();
