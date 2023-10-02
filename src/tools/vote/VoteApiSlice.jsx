import { apiSlice } from "../../app/api/apiSlice"



export const voteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCandidates: builder.query({
            query: () => '/voting/candidates/',
        }),
        getCandidatesFaculty: builder.query({
            query: () => '/voting/candidates-faculty/',
        }),
        getDepartmentVotes: builder.query({
            query: () => 'department/',
        }),
        postDepartmentVotes: builder.mutation({
            query: (votes) => ({
                url: '/voting/department/',
                method: 'POST',
                body: { votes },
            }),
        }),
        getFacultyVotes: builder.query({
            query: () => '/voting/faculty/',
        }),
        postFacultyVotes: builder.mutation({
            query: (votes) => ({
                url: '/voting/faculty/',
                method: 'POST',
                body: { votes },
            }),
        }),
        getSugVotes: builder.query({
            query: () => '/voting/sug/',
        }),
        postSugVotes: builder.mutation({
            query: (votes) => ({
                url: '/voting/sug/',
                method: 'POST',
                body: { votes },
            }),
        }),
    }),
});


export const {
    useGetCandidatesQuery,
    useGetCandidatesFacultyQuery,
    useGetDepartmentVotesQuery,
    usePostDepartmentVotesMutation,
    useGetFacultyVotesQuery,
    usePostFacultyVotesMutation,
    useGetSugVotesQuery,
    usePostSugVotesMutation,
} = voteApiSlice;
