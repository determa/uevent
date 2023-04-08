import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../store/reducers/UserSlice";
import { userAPI } from "../services/UserService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faUser } from "@fortawesome/free-solid-svg-icons";
import { companyAPI } from "../services/CompanyService";

const CompanyData = () => {
    const { id } = useSelector(state => state.userReducer);
    const { data } = companyAPI.useGetOneCompanyQuery(id);
    return (
        <>
            {data && <img
                className="rounded-full object-cover object-center w-8 h-8"
                src={`http://localhost:5000/${data.picture}`}
            />}
        </>
    )
}

const UserData = () => {
    const { id } = useSelector(state => state.userReducer);
    const { data } = userAPI.useGetOneUserQuery(id);
    return (
        <>
            {data && <img
                className="rounded-full w-8 h-8 object-cover object-center backdrop-blur-sm"
                src={`http://localhost:5000/${data.picture}`}
            />}
        </>
    )
}

const DropDown = () => {
    const dispatch = useDispatch();
    const { type, id } = useSelector(state => state.userReducer);
    const [logout] = userAPI.useLogoutMutation();
    // const { data } = userAPI.useGetOneUserQuery(id);
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
                    {type === 'USER' ? <UserData />
                        : type === 'COMPANY' ? <CompanyData />
                            : <img
                                className="rounded-full w-8 h-8 object-cover object-center"
                                src={`http://localhost:5000/default.jpg`} />
                    }
                </div>

                {isOpen && (
                    <div
                        id="sett"
                        className="absolute right-0 z-10 mt-1 w-40 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                        <div className="py-1 flex flex-col">
                            <Link
                                to={`/profile/${id}`}
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
