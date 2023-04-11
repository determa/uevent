import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const eventAPI = createApi({
    reducerPath: "eventAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Event"],
    endpoints: (build) => ({
        getOneEvent: build.query({
            query: (data) => ({
                url: `/events/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        getAllEvents: build.query({
            query: () => ({
                url: `/events`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        getAllEventsByCompany: build.query({
            query: (data) => ({
                url: `/events/company/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        create: build.mutation({
            query: (data) => ({
                url: `/events`,
                method: "POST",
                body: data,
            }),
            // providesTags: result => ['User']
        }),
        getPaymentData: build.query({
            query: (data) => ({
                url: `/events/payment-data/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
    }),
});
