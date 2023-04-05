import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from "jwt-decode";

const authSlice = createSlice({
    name: 'auth',
    initialState: { token: null, isAuth: false, accountId: null, id: null, type: null, confirmed: null },
    reducers: {
        setCredentials: (state, action) => {
            const { jwt_token } = action.payload.data;
            const { accountId, id, type, confirmed } = jwt_decode(jwt_token);
            state.token = jwt_token;
            state.type = type;
            state.isAuth = true;
            state.accountId = accountId;
            state.id = id;
            state.confirmed = confirmed;
            console.log("data refreshed")
            // state.role = role;
        },
        logOut: (state, action) => {
            state.token = null;
            state.type = null;
            state.isAuth = false;
            state.accountId = null;
            state.id = null;
            state.confirmed = null;
        }
    }
})
export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;