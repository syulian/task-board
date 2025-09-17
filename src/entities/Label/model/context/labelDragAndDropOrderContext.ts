import LabelSchema from '@entities/Label/model/types/LabelSchema';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [LabelDragAndDropOrderContext, useLabelDragAndDropOrderContext] =
    createDragAndDropOrderContext<LabelSchema>();
