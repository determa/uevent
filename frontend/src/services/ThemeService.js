import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const themeAPI = createApi({
    reducerPath: "themeAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Category"],
    endpoints: (build) => ({
        getAll: build.query({
            query: () => ({
                url: `/themes`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        create: build.mutation({
            query: (data) => ({
                url: `/themes`,
                method: "POST",
                body: data,
            }),
            // providesTags: result => ['User']
        }),
    }),
});
