import BoardLinkSchema from '@entities/Board/model/types/BoardLinkSchema';
import BoardsGroupSchema from '@entities/Board/model/types/BoardsGroupSchema';
import { createDragAndDropContext } from '@shared/lib';

export const [BoardDragAndDropContext, useBoardDragAndDropContext] = createDragAndDropContext<
    BoardLinkSchema,
    BoardsGroupSchema
>();
