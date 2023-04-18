import { baseAPI } from "./BaseAPIService";

export const ticketAPI = baseAPI.injectEndpoints({
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
