import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { userAPI } from '../services/UserService'
import authReducer from './reducers/UserSlice'

const rootReducer = combineReducers({
    authReducer,
    [userAPI.reducerPath]: userAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(userAPI.middleware)
    })
}