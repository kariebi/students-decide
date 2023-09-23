import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authapiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/account/auth/login',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFTOKEN': 'nHioDo6oddwVXX91NAZGj3dDuQ1VeyeCuKw0NMRSUQZwl55ziGxh5r9fQuqBGLdw',
                },
                body: { ...credentials }
            }),
            // async onQueryStarted(arg, { dispatch, queryFulfilled, rejectWithValue }) {
            //     try {
            //         const { data } = await queryFulfilled;
            //         console.log(data);
            //         dispatch(setCredentials({ accessToken: data.accessToken }));
            //     } catch (err) {
            //         console.error(err);
            //         return rejectWithValue(err.message); // Handle the error gracefully
            //     }
            // }
        }),
        sendLogout: builder.mutation({
            query: () => ({
                url: '/account/auth/logout',
                method: 'POST',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    dispatch(logOut())
                    setTimeout(() => {
                        dispatch(apiSlice.util.resetApiState())
                    }, 1000)
                } catch (err) {
                    console.log(err)
                }
            }
        }),
        refresh: builder.mutation({
            query: () => ({
                url: '/auth/refresh',
                method: 'GET',
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled
                    console.log(data)
                    const { accessToken } = data
                    dispatch(setCredentials({ accessToken }))
                } catch (err) {
                    console.log(err)
                }
            }
        }),
    })
})

export const {
    useLoginMutation,
    useSendLogoutMutation,
    useRefreshMutation,
} = authapiSlice 