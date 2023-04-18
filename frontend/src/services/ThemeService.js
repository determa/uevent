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
    }),
});
