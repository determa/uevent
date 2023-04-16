import { createApi } from "@reduxjs/toolkit/dist/query/react";
import baseQueryWithReauth from "./QueryWithReauth";

export const ticketAPI = createApi({
    reducerPath: "ticketAPI",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Ticket"],
    endpoints: (build) => ({
        getAllTickets: build.query({
            query: () => ({
                url: `/ticket`,
                method: "GET",
            }),
            providesTags: ["Ticket"],
        }),
    }),
});
