import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userAPI } from '../services/UserService'
import { companyAPI } from '../services/CompanyService'
import userReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
    userReducer,
    [userAPI.reducerPath]: userAPI.reducer,
    [companyAPI.reducerPath]: companyAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(userAPI.middleware, companyAPI.middleware)
    })
}