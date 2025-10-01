import ILabel from '@entities/Label/model/types/ILabel';
import { createDragAndDropOrderContext } from '@shared/lib';

export const [LabelDragAndDropOrderContext, useLabelDragAndDropOrderContext] =
    createDragAndDropOrderContext<ILabel>();
