import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../store/reducers/UserSlice";
import { userAPI } from "../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";

const DropDown = () => {
    const dispatch = useDispatch();
    const [logout] = userAPI.useLogoutMutation();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="relative text-left">
                <div
                    className="flex items-center justify-center"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {/* <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gray-400 text-gray-800 cursor-pointer hover:bg-gray-500">
                        <FontAwesomeIcon icon={faUser} />
                    </div> */}
                    <img
                        className="rounded-full w-8 h-8"
                        src="https://static-cdn.jtvnw.net/jtv_user_pictures/9e2f1fe0-e17b-44f1-9bee-e083b856920e-profile_image-70x70.png"
                    />
                </div>

                {isOpen && (
                    <div
                        id="sett"
                        className="absolute right-0 z-10 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                        <div className="py-1 flex flex-col">
                            <Link
                                to="/profile"
                                className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                            >
                                Ваш профиль
                            </Link>
                            <Link className="text-gray-700 px-4 py-2 text-sm cursor-pointer">
                                Ваши билеты
                            </Link>
                            <Link className="text-gray-700 px-4 py-2 text-sm cursor-pointer">
                                Понравившиеся
                            </Link>
                        </div>
                        <div className="py-1 flex flex-col border-t border-gray-400">
                            <Link
                                to="/"
                                onClick={() => {
                                    dispatch(logOut());
                                    logout();
                                }}
                                className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                            >
                                Выйти
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const Header = () => {
    const { isAuth } = useSelector((state) => state.userReducer);

    return (
        <header className="bg-gradient-to-r from-[#ED4690]/70 to-[#5522CC]/70 w-full h-full border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-800">
            <nav>
                <ul className="flex h-8 text-white flex-wrap items-center justify-between mx-auto max-w-7xl">
                    <li>
                        <Link className="logo" to="/">
                            uevent
                        </Link>
                    </li>
                    {isAuth ? (
                        <li>
                            <DropDown />
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
