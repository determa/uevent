import { baseAPI } from "./BaseAPIService";

export const favoriteAPI = baseAPI.injectEndpoints({
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
