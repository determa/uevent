import {
    combineReducers,
    configureStore,
} from "@reduxjs/toolkit";
import { baseAPI } from "../services/BaseAPIService";
import userReducer from "./reducers/UserSlice";

const rootReducer = combineReducers({
    userReducer,
    [baseAPI.reducerPath]: baseAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                baseAPI.middleware,
            ),
    });
};
