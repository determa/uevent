import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithReauth from './QueryWithReauth';

export const eventAPI = createApi({
    reducerPath: 'eventAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Event'],
    endpoints: (build) => ({
        getOneEvent: build.query({
            query: (data) => ({
                url: `/events/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
    })
})