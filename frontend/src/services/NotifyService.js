import { createApi } from '@reduxjs/toolkit/dist/query/react';
import baseQueryWithReauth from './QueryWithReauth';

export const notifyAPI = createApi({
    reducerPath: 'notifyAPI',
    baseQuery: baseQueryWithReauth,
    tagTypes: ['Favorite', 'NotifyEvent'],
    endpoints: (build) => ({
        getFavoriteState: build.query({
            query: (data) => ({
                url: '/favorite',
                method: "GET",
                params: data,
            }),
            providesTags: ['Favorite'],
        }),
        favoriteSubscribe: build.mutation({
            query: (data) => ({
                url: `/favorite`,
                method: "POST",
                params: data,
            }),
            invalidatesTags: ['Favorite'],
        }),
        favoriteUnsubscribe: build.mutation({
            query: (data) => ({
                url: `/favorite`,
                method: "DELETE",
                params: data,
            }),
            invalidatesTags: ['Favorite']
        }),
        getEventNotifyState: build.query({
            query: (data) => ({
                url: '/event-notification',
                method: "GET",
                params: data,
            }),
            providesTags: ['NotifyEvent'],
        }),
        eventSubscribe: build.mutation({
            query: (data) => ({
                url: `/event-notification`,
                method: "POST",
                params: data,
            }),
            invalidatesTags: ['NotifyEvent'],
        }),
        eventUnsubscribe: build.mutation({
            query: (data) => ({
                url: `/event-notification`,
                method: "DELETE",
                params: data,
            }),
            invalidatesTags: ['NotifyEvent']
        }),
    })
})