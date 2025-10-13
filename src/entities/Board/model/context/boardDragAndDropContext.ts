import Board from '@entities/Board/model/types/Board';
import BoardsGroup from '@entities/Board/model/types/BoardsGroup';
import { createDragAndDropContext } from '@shared/lib';

export const [BoardDragAndDropContext, useBoardDragAndDropContext] = createDragAndDropContext<
    Board,
    BoardsGroup
>();
