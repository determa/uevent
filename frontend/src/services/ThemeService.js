import { baseAPI } from "./BaseAPIService";

export const themeAPI = baseAPI.injectEndpoints({
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
