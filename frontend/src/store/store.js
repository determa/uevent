import {
    combineReducers,
    configureStore,
    getDefaultMiddleware,
} from "@reduxjs/toolkit";
import { userAPI } from "../services/UserService";
import { companyAPI } from "../services/CompanyService";
import { eventAPI } from "../services/EventService";
import userReducer from "./reducers/UserSlice";
import { themeAPI } from "../services/ThemeService";
import { categoryAPI } from "../services/CategoryService";
import { commentAPI } from "../services/CommentService";
import { notifyAPI } from "../services/NotifyService";

const rootReducer = combineReducers({
    userReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [companyAPI.reducerPath]: companyAPI.reducer,
    [eventAPI.reducerPath]: eventAPI.reducer,
    [themeAPI.reducerPath]: themeAPI.reducer,
    [categoryAPI.reducerPath]: categoryAPI.reducer,
    [commentAPI.reducerPath]: commentAPI.reducer,
    [notifyAPI.reducerPath]: notifyAPI.reducer,
});

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(
                userAPI.middleware,
                companyAPI.middleware,
                eventAPI.middleware,
                themeAPI.middleware,
                categoryAPI.middleware,
                commentAPI.middleware,
                notifyAPI.middleware,
            ),
    });
};
