import { GetBoardsGroupsQuery } from '@shared/types';

type BoardsGroup = NonNullable<GetBoardsGroupsQuery['getBoardsGroups'][number]>;
export default BoardsGroup;
