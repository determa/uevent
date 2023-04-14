import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const categoryAPI = createApi({
    reducerPath: "categoryAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Category"],
    endpoints: (build) => ({
        getAllCategories: build.query({
            query: () => ({
                url: `/categories`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        getAllCategoriesByTheme: build.query({
            query: (data) => ({
                url: `/categories/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        getAllCategoriesByEvent: build.query({
            query: (data) => ({
                url: `/categories/event/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        create: build.mutation({
            query: (data) => ({
                url: `/categories`,
                method: "POST",
                body: data,
            }),
            // providesTags: result => ['User']
        }),
    }),
});
