// VoteSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    VotesMade: 0,
    Candidates:[]
};

const VoteSlice = createSlice({
    name: 'Vote',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.VotesMade=action.payload.VotesMade
            state.Candidates=action.payload.VotesMade
        }
    }
});

export const { setCredentials } = VoteSlice.actions;
export const selectCandidates = (state) => state.Vote.Candidates;
export default VoteSlice.reducer;