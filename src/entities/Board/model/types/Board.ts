import { GetBoardsGroupsQuery } from '@shared/types';

type Board = NonNullable<GetBoardsGroupsQuery['getBoardsGroups'][number]['items'][number]>;
export default Board;
