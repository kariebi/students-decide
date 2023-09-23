import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from './api/ApiSlice'
import { setupListeners } from "@reduxjs/toolkit/query"
import authReducer from '../tools/auth/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: false
})

setupListeners(store.dispatch)