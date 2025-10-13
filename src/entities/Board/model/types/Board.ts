import { GetBoardQuery } from '@shared/types/generated/graphql';

type Board = NonNullable<GetBoardQuery['getBoard']>;
export default Board;
