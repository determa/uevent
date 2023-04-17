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
        create: build.mutation({
            query: (data) => ({
                url: `/events`,
                method: "POST",
                body: data,
            }),
            invalidatesTags: ["Event"],
        }),
        update: build.mutation({
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
    }),
});
