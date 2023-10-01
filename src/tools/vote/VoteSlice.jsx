// VoteSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    VotesMade: 0,
    Candidates:[],
    roles:{},
};

const VoteSlice = createSlice({
    name: 'Vote',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.VotesMade=action.payload.VotesMade
            state.Candidates=action.payload.Candidates
            state.roles=action.payload.roles
        }
    }
});

export const { setCredentials } = VoteSlice.actions;
export const selectCandidates = (state) => state.Vote.Candidates;
export const selectRoles = (state) => state.Vote.Roles;
export default VoteSlice.reducer;