import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import rightSidebar from '@features/RightSidebar/model/slice/rightSidebarSlice';

const rootReducer = combineReducers({
    rightSidebar: rightSidebar,
});

export const setupStore = () =>
    configureStore({
        reducer: rootReducer,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
