import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithReauth from './QueryWithReauth';

export const companyAPI = createApi({
    reducerPath: 'companyAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        getOneCompany: build.query({
            query: (data) => ({
                url: `/company/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
    })
})