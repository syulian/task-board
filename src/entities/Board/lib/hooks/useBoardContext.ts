import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { BoardItemSchema, BoardsGroupSchema } from '@entities/Board';

export interface IBoardContext {
    currentItem: BoardItemSchema | null;
    setCurrentItem: Dispatch<SetStateAction<BoardItemSchema | null>>;
    currentGroup: BoardsGroupSchema | null;
    setCurrentGroup: Dispatch<SetStateAction<BoardsGroupSchema | null>>;
    setGroups: Dispatch<SetStateAction<BoardsGroupSchema[]>>;
}

export const BoardContext = createContext<IBoardContext | null>(null);

export const useBoardContext = () => {
    const context = useContext(BoardContext);
    if (!context) throw new Error('useBoardContext must be used within a Provider');

    return context;
};
