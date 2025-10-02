import IBoard from '@entities/Board/model/types/IBoard';
import IBoardsGroup from '@entities/Board/model/types/IBoardsGroup';
import { createDragAndDropContext } from '@shared/lib';

export const [BoardDragAndDropContext, useBoardDragAndDropContext] = createDragAndDropContext<
    IBoard,
    IBoardsGroup
>();
