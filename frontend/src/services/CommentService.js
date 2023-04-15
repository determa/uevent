import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const commentAPI = createApi({
    reducerPath: "commentAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Comment"],
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

        create: build.mutation({
            query: (data) => ({
                url: `/comments`,
                method: "POST",
                body: data.body,
                params: data.params,
            }),
            invalidatesTags: ["Comment"],
        }),
    }),
});
