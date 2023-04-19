import { baseAPI } from "./BaseAPIService";

export const companyAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOneCompany: build.query({
            query: (data) => ({
                url: `/company/${data}`,
                method: "GET",
            }),
            providesTags: ["User"],
        }),

        updateCompany: build.mutation({
            query: (data) => ({
                url: `/company/${data.id}`,
                method: "PATCH",
                body: data.data,
            }),
            invalidatesTags: ["User", "Event"],
        }),
    }),
});
