import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { setCredentials, logOut } from '../store/reducers/UserSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:5000/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().userReducer.token;
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    }
})

export default async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.log('sending refresh token');
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ data: refreshResult.data }))
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
}