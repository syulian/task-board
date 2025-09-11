import LabelSchema from '@entities/LabelControl/model/types/LabelSchema';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [LabelDragAndDropOrderContext, useLabelDragAndDropOrderContext] =
    createDragAndDropOrderContext<LabelSchema>();
