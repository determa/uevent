import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import { userAPI } from "./services/UserService";
import { setCredentials } from "./store/reducers/UserSlice";
import dayjs from "dayjs";
import "dayjs/locale/ru"; // load on demand
dayjs.locale("ru");

const App = () => {
    const dispatch = useDispatch();
    const { data } = userAPI.useInitQuery();
    useEffect(() => {
        if (data?.jwt_token) {
            dispatch(setCredentials({ data }));
        }
    }, [data, dispatch]);

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
};

export default App;
