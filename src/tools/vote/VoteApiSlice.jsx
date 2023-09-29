import { apiSlice } from "../../app/api/apiSlice"


// Create the `VoteApiSlice`
export const voteApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCandidates: builder.query({
            query: () => 'candidates/',
        }),
        getCandidatesFaculty: builder.query({
            query: () => 'candidates-faculty/',
        }),
        getDepartmentVotes: builder.query({
            query: () => 'department/',
        }),
        postDepartmentVotes: builder.mutation({
            query: (votes) => ({
                url: 'department/',
                method: 'POST',
                body: { votes },
            }),
        }),
        getFacultyVotes: builder.query({
            query: () => 'faculty/',
        }),
        postFacultyVotes: builder.mutation({
            query: (votes) => ({
                url: 'faculty/',
                method: 'POST',
                body: { votes },
            }),
        }),
        getSugVotes: builder.query({
            query: () => 'sug/',
        }),
        postSugVotes: builder.mutation({
            query: (votes) => ({
                url: 'sug/',
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
