import { baseAPI } from "./BaseAPIService";

export const eventAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getOneEvent: build.query({
            query: (data) => ({
                url: `/events/${data}`,
                method: "GET",
            }),
            providesTags: ["Event"],
        }),
        getAllEvents: build.query({
            query: (data) => ({
                url: `/events`,
                method: "GET",
                params: data,
            }),
            providesTags: ["Event"],
        }),
        getAllEventsByCompany: build.query({
            query: (data) => ({
                url: `/events/company/${data}`,
                method: "GET",
            }),
            providesTags: ["Event"],
        }),
        createEvent: build.mutation({
            query: (data) => ({
                url: `/events`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Event"],
        }),
        updateEvent: build.mutation({
            query: (data) => ({
                url: `/events/${data.id}`,
                method: "PATCH",
                body: data.data,
            }),
            invalidatesTags: ["Event"],
        }),
        getPaymentData: build.query({
            query: (data) => ({
                url: `/events/payment-data/${data}`,
                method: "GET",
            }),
            providesTags: ["Event", "User"],
        }),
        getEventUsers: build.query({
            query: (data) => ({
                url: `/events/users/${data.id}`,
                method: "GET",
            }),
            providesTags: ["Event", "User"],
        }),
    }),
});
