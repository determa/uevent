import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const notifyAPI = createApi({
    reducerPath: "notifyAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["NotifyEvent", "NotifyCompany"],
    endpoints: (build) => ({
        getEventNotifyState: build.query({
            query: (data) => ({
                url: "/event-notification",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyEvent"],
        }),
        getEventsNotify: build.query({
            query: (data) => ({
                url: "/event-notification/events",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyEvent"],
        }),
        eventSubscribe: build.mutation({
            query: (data) => ({
                url: `/event-notification`,
                method: "POST",
                params: data,
            }),
            invalidatesTags: ["NotifyEvent"],
        }),
        eventUnsubscribe: build.mutation({
            query: (data) => ({
                url: `/event-notification`,
                method: "DELETE",
                params: data,
            }),
            invalidatesTags: ["NotifyEvent"],
        }),

        //company notify
        getCompanyNotifyState: build.query({
            query: (data) => ({
                url: "/company-notification",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyCompany"],
        }),
        getCompaniesNotify: build.query({
            query: (data) => ({
                url: "/company-notification/companies",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyCompany"],
        }),
        companySubscribe: build.mutation({
            query: (data) => ({
                url: `/company-notification`,
                method: "POST",
                params: data,
            }),
            invalidatesTags: ["NotifyCompany"],
        }),
        companyUnsubscribe: build.mutation({
            query: (data) => ({
                url: `/company-notification`,
                method: "DELETE",
                params: data,
            }),
            invalidatesTags: ["NotifyCompany"],
        }),
    }),
});
