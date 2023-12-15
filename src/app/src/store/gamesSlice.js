import { createSlice } from "@reduxjs/toolkit";

export const gamesSlice = createSlice({
    name: 'games',
    initialState: {
        index: 0,
        answers: {},
        current: null,
        status: 'initial',
        isCorrect: false
    },
    reducers: {
        setStatus: (state, { payload }) => {
            state.status = payload;
        },
        setIndex: (state, { payload }) => {
            state.index = payload;
        },
        setCurrent: (state, { payload }) => {
            state.current = payload;
        },
        setAnswers: (state, { payload }) => {
            state.answers = payload;
        },
        setCorrect: (state, { payload }) => {
            state.isCorrect = payload;
        },
        resetGames: (state, { payload }) => {    
            state.index = 0;
            state.answers = {};    
            state.current = null;
            state.status = 'initial';
        }
    }
})

export const { setIndex, setStatus, setCurrent, setAnswers, setCorrect, resetGames } = gamesSlice.actions;
export default gamesSlice.reducer;
