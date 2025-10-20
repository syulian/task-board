import { combineReducers, configureStore } from '@reduxjs/toolkit';
import rightSidebar from '@features/RightSidebar/model/slice/rightSidebarSlice';

const rootReducer = combineReducers({
    rightSidebar: rightSidebar,
});

export const setupStore = (preloadedState?: Partial<RootState>) =>
    configureStore({
        reducer: rootReducer,
        preloadedState,
    });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
