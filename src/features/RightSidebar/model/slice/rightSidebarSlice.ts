import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IRightSidebarState {
    isExpanded: boolean;
}

const initialState: IRightSidebarState = {
    isExpanded: false,
};

const rightSidebarSlice = createSlice({
    name: 'rightSidebarSlice',
    initialState,
    reducers: {
        setIsExpanded(state, action: PayloadAction<boolean>) {
            state.isExpanded = action.payload;
        },
    },
});

export default rightSidebarSlice.reducer;
export const { setIsExpanded } = rightSidebarSlice.actions;
