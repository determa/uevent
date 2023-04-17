import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithReauth from './QueryWithReauth';

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['User'],
    endpoints: (build) => ({
        init: build.query({
            query: () => ({
                url: '/auth/refresh',
                method: "GET",
            }),
            providesTags: ['User']
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
            query: () => ({
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
            }),
            invalidatesTags: ['User']
        }),
        registerUser: build.mutation({
            query: (data) => ({
                url: '/auth/register/user',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        registerCompany: build.mutation({
            query: (data) => ({
                url: '/auth/register/company',
                method: "POST",
                body: data
            }),
            invalidatesTags: ['User']
        }),
        sendRequest: build.mutation({
            query: () => ({
                url: '/auth/validation',
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        confirmEmail: build.query({
            query: (data) => ({
                url: `/auth/validation/${data}`,
                method: "GET",
            }),
            // providesTags: result => ['User']
        }),
        getOneUser: build.query({
            query: (data) => ({
                url: `/user/${data}`,
                method: "GET",
            }),
            providesTags: ['User']
        }),
        getUsers: build.query({
            query: () => ({
                url: `/user`,
                method: "GET",
            }),
            // providesTags: ['User']
        }),
    })
})