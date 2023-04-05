import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../store/reducers/UserSlice";
import { userAPI } from "../services/UserService";

const Header = () => {
    const { isAuth } = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const [logout] = userAPI.useLogoutMutation();

    return (
        <header className="bg-gradient-to-r from-[#ED4690]/70 to-[#5522CC]/70 w-full h-full border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-800">
            <nav>
                <ul className="flex text-white flex-wrap justify-between items-center mx-auto max-w-screen-xl">
                    <li>
                        <Link className="logo" to="/">
                            uevent
                        </Link>
                    </li>
                    <li>
                        <Link to="/">Schedule</Link>
                    </li>
                    <li>
                        <Link to="/">Speakers</Link>
                    </li>
                    <li>
                        <Link to={`/`}>Ticket</Link>
                    </li>
                    <li>
                        <Link to={`/user`}>Profile</Link>
                    </li>
                    {isAuth ? (
                        <li
                            onClick={() => {
                                dispatch(logOut());
                                logout();
                            }}
                        >
                            logOut
                        </li>
                    ) : (
                        <li>
                            <Link to="/auth">Create account</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
