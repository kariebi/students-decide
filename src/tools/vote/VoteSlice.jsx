// VoteSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    VotesMade: 0,
};

const VoteSlice = createSlice({
    name: 'Vote',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.VotesMade=action.payload.VotesMade
        }
    }
});


export default VoteSlice.reducer;