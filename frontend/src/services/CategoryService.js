import { baseAPI } from "./BaseAPIService";

export const categoryAPI = baseAPI.injectEndpoints({
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
    }),
});
