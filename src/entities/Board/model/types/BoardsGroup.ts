import { GetBoardsGroupsQuery } from '@shared/types/generated/graphql';

type BoardsGroup = NonNullable<GetBoardsGroupsQuery['getBoardsGroups'][number]>;
export default BoardsGroup;
