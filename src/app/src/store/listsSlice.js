import { createSlice } from "@reduxjs/toolkit";

export const listsSlice = createSlice({
    name: 'lists',
    initialState: {
        status: {}
    },
    reducers: {
        setStatus: (state, { payload }) => {          
            state.status = payload;
        }
    }
})

export const { setStatus } = listsSlice.actions;
export default listsSlice.reducer;
