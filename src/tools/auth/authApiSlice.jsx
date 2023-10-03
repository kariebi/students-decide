import { apiSlice } from "../../app/api/apiSlice"
import { logOut, setCredentials } from "./authSlice"

export const authapiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/account/login/',
                method: 'POST',
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
        getUser: builder.query({
            query: () => 'account/user',
        }),
        // sendLogout: builder.mutation({
        //     query: () => ({
        //         url: '/account/auth/logout/',
        //         method: 'POST',
        //     }),
        //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled
        //             console.log(data)
        //             dispatch(logOut())
        //             setTimeout(() => {
        //                 dispatch(apiSlice.util.resetApiState())
        //             }, 1000)
        //         } catch (err) {
        //             console.log(err)
        //         }
        //     }
        // }),
        // refresh: builder.mutation({
        //     query: () => ({
        //         url: '/auth/refresh/',
        //         method: 'GET',
        //     }),
        //     async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        //         try {
        //             const { data } = await queryFulfilled
        //             console.log(data)
        //             const { accessToken } = data
        //             dispatch(setCredentials({ accessToken }))
        //         } catch (err) {
        //             console.log(err)
        //         }
        //     }
        // }),
        passwordRecovery: builder.mutation({
            query: (email) => ({
                url: '/account/auth/password-recovery/', // Adjust the URL as needed
                method: 'POST',
                body: { email }, // Pass the email as the request body
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const { data } = await queryFulfilled;
                    console.log(data); // Handle the response from the server
                    //  can dispatch actions or update component state here
                } catch (err) {
                    console.error(err);
                    // Handle errors if needed
                }
            },
        }),
    })
})

export const {
    useLoginMutation,
    // useSendLogoutMutation,
    // useRefreshMutation,
    useGetUserQuery,
    usePasswordRecoveryMutation,
} = authapiSlice 