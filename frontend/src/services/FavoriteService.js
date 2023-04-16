import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const favoriteAPI = createApi({
    reducerPath: "favoriteAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Favorite"],
    endpoints: (build) => ({
        getFavoriteEvents: build.query({
            query: () => ({
                url: "/favorite/events",
                method: "GET",
            }),
            providesTags: ["Favorite"],
        }),
        getFavoriteState: build.query({
            query: (data) => ({
                url: "/favorite",
                method: "GET",
                params: data,
            }),
            providesTags: ["Favorite"],
        }),
        favoriteSubscribe: build.mutation({
            query: (data) => ({
                url: `/favorite`,
                method: "POST",
                params: data,
            }),
            invalidatesTags: ["Favorite"],
        }),
        favoriteUnsubscribe: build.mutation({
            query: (data) => ({
                url: `/favorite`,
                method: "DELETE",
                params: data,
            }),
            invalidatesTags: ["Favorite"],
        }),
    }),
});
