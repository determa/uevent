import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithReauth from './QueryWithReauth';

export const userAPI = createApi({
    reducerPath: 'API',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        init: build.query({
            query: (data) => ({
                url: '/auth/refresh'
            }),
            providesTags: result => ['User']
        }),
        login: build.mutation({
            query: (data) => ({
                url: '/auth/login',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        logout: build.mutation({
            query: (data) => ({
                url: '/auth/logout',
                method: "POST"
            }),
            invalidatesTags: ['User']
        }),
        register: build.mutation({
            query: (data) => ({
                url: '/auth/register',
                method: "POST",
                body: data
            })
        }),
    })
})