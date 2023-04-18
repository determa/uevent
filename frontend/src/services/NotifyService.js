import { baseAPI } from "./BaseAPIService";

export const notifyAPI = baseAPI.injectEndpoints({
    endpoints: (build) => ({
        getEventNotifyState: build.query({
            query: (data) => ({
                url: "/event-notification",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyEvent", "User"],
        }),
        getEventsNotify: build.query({
            query: (data) => ({
                url: "/event-notification/events",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyEvent", "User"],
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
            providesTags: ["NotifyCompany", "User"],
        }),
        getCompaniesNotify: build.query({
            query: (data) => ({
                url: "/company-notification/companies",
                method: "GET",
                params: data,
            }),
            providesTags: ["NotifyCompany", "User"],
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
