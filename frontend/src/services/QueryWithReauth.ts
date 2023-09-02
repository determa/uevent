import { fetchBaseQuery, BaseQueryFn } from '@reduxjs/toolkit/dist/query/react';
import { setCredentials, logOut } from '../store/reducers/UserSlice';
import { RootState } from '@/store/store';

const baseQuery = fetchBaseQuery({
    baseUrl: process.env.REACT_APP_SERVER_DOMEN + '/api',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).userReducer.token;
        if (token) {
            headers.set('authorization', `Bearer ${token}`);
        }
        return headers;
    },
});

const QueryWithReauth: BaseQueryFn = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result?.error?.status === 401) {
        console.log('sending refresh token');
        const refreshResult = await baseQuery('/auth/refresh', api, extraOptions);
        if (refreshResult?.data) {
            api.dispatch(setCredentials({ data: refreshResult.data }));
            result = await baseQuery(args, api, extraOptions);
        } else {
            api.dispatch(logOut());
        }
    }
    return result;
};

export default QueryWithReauth;
