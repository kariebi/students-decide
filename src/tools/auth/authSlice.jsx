// authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  registrationNumber: '', // Add a registration number field
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.registrationNumber = action.payload.registrationNumber; // Save the registration number
    },
    logOut: (state) => {
      state.token = null;
      state.registrationNumber = ''; // Clear the registration number on logout
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;
export const selectRegistrationNumber = (state) => state.auth.registrationNumber; // Select the registration number
export default authSlice.reducer;
