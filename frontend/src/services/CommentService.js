import { baseAPI } from "./BaseAPIService";

export const commentAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getCommentsByEvent: build.query({
            query: (data) => ({
                url: `/comments/event`,
                method: "GET",
                params: data,
            }),
            providesTags: ["Comment"],
        }),

        getCommentsByAccount: build.query({
            query: (data) => ({
                url: `/comments/account`,
                method: "GET",
                params: data,
            }),
            providesTags: ["Comment"],
        }),

        createComment: build.mutation({
            query: (data) => ({
                url: "/comments",
                method: "POST",
                body: data.body,
                params: data.params,
            }),
            invalidatesTags: ["Comment"],
        }),
    }),
});
