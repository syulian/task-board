import IBoardLink from '@entities/Board/model/types/IBoardLink';
import IBoardsGroup from '@entities/Board/model/types/IBoardsGroup';
import { createDragAndDropContext } from '@shared/lib';

export const [BoardDragAndDropContext, useBoardDragAndDropContext] = createDragAndDropContext<
    IBoardLink,
    IBoardsGroup
>();
