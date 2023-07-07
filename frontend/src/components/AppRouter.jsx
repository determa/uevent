import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, confirmedAccountRoutes, authRoutes } from '../router/routes';
import { useSelector } from 'react-redux';


const AppRouter = () => {
    const {isAuth, confirmed} = useSelector((state) => state.userReducer);
    // const role = useSelector(store => store.Auth.user.role);
    return (
        <Routes>
            {publicRoutes.map(({path, component}) => {
                return <Route key={path} path={path} element={component} exact/>
            })}
            {isAuth && confirmed && confirmedAccountRoutes.map(({path, component}) => {
                return <Route key={path} path={path} element={component} exact/>
            })}

            {isAuth && authRoutes.map(({path, component}) => {
                return <Route key={path} path={path} element={component} exact/>
            })}
            <Route path='*' element={<Navigate to={'/'} replace/>}/>
        </Routes>
    )

}

export default AppRouter