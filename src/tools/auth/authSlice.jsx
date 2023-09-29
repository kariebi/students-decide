// authSlice.jsx
import { createSlice } from '@reduxjs/toolkit';

// Check if isLoggedIn and registrationNumber are stored in localStorage
const initialLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const initialRegistrationNumber = localStorage.getItem('registrationNumber') || '';

const initialState = {
  token: null,
  registrationNumber: initialRegistrationNumber,
  LoggedIn: initialLoggedIn,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.token = action.payload.accessToken;
      state.LoggedIn = action.payload.LoggedIn;
      state.registrationNumber = action.payload.registrationNumber;

      // Save isLoggedIn and registrationNumber to localStorage
      localStorage.setItem('isLoggedIn', action.payload.LoggedIn);
      localStorage.setItem('registrationNumber', action.payload.registrationNumber);
    },
    logOut: (state) => {
      state.token = null;
      state.registrationNumber = '';
      state.LoggedIn = false;

      // Clear isLoggedIn,token and registrationNumber from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('registrationNumber');
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export const selectCurrentToken = (state) => state.auth.token;
export const selectLoggedIn = (state) => state.auth.LoggedIn;
export const selectRegistrationNumber = (state) => state.auth.registrationNumber;
export default authSlice.reducer;
