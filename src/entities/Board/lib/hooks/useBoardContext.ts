import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { BoardItemSchema, BoardsGroupSchema } from '@entities/Board';

export interface IBoardContext {
    currentItem: BoardItemSchema | null;
    setBoardsList: Dispatch<SetStateAction<BoardsGroupSchema[] | null>>;
    setCurrentItem: Dispatch<SetStateAction<BoardItemSchema | null>>;
}

export const BoardContext = createContext<IBoardContext | null>(null);

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (!context) throw new Error('useBoardContext must be used within a Provider');

    return context;
};
