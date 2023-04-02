import React from 'react';
// import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { publicRoutes, privateRoutes, adminRoutes } from '../router/routes';


const AppRouter = () => {
    const isAuth = false;
    // const isAuth = useSelector(store => store.Auth.status);
    // const role = useSelector(store => store.Auth.user.role);
    return (
        <Routes>
            {publicRoutes.map(({path, component}) => {
                return <Route key={path} path={path} element={component} exact/>
            })}
            <Route path='*' element={<Navigate to={'/'} replace/>}/>
        </Routes>
    )

}

export default AppRouter