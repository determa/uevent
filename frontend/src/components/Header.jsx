import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logOut } from "../store/reducers/UserSlice";
import { userAPI } from "../services/UserService";
import { companyAPI } from "../services/CompanyService";
import CreateEvent from "./CreateEvent";
import Modal from "./Modal";
import { Box, IconButton, Menu, Tooltip } from "@mui/material";

const ProfileImg = ({ data }) => {
    return (
        <>
            {data && (
                <img
                    className="rounded-full object-cover object-center backdrop-blur-sm w-12 h-12"
                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                />
            )}
        </>
    );
};

const CompanyData = () => {
    const { id } = useSelector((state) => state.userReducer);
    const { data } = companyAPI.useGetOneCompanyQuery(id);
    return <ProfileImg data={data} />;
};

const UserData = () => {
    const { id } = useSelector((state) => state.userReducer);
    const { data } = userAPI.useGetOneUserQuery(id);
    return <ProfileImg data={data} />;
};

const DropDown = () => {
    const dispatch = useDispatch();
    const { isAuth, type, id, confirmed } = useSelector(
        (state) => state.userReducer
    );
    const [logout] = userAPI.useLogoutMutation();

    const [anchorElUser, setAnchorElUser] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            {showModal && (
                <Modal
                    showModal={showModal}
                    setShowModal={setShowModal}
                    Component={CreateEvent}
                />
            )}
            <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        {type === "USER" ? (
                            <UserData />
                        ) : type === "COMPANY" ? (
                            <CompanyData />
                        ) : (
                            <img
                                className="rounded-full object-cover object-center backdrop-blur-sm w-12 h-12"
                                src={`${process.env.REACT_APP_SERVER_DOMEN}/default.jpg`}
                            />
                        )}
                    </IconButton>
                </Tooltip>
                <Menu
                    sx={{ mt: "50px" }}
                    id="menu-appbar"
                    anchorEl={anchorElUser}
                    anchorOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: "top",
                        horizontal: "right",
                    }}
                    open={Boolean(anchorElUser)}
                    onClose={handleCloseUserMenu}
                >
                    <div
                        className="flex flex-col pb-1"
                        // onClick={handleCloseUserMenu}
                    >
                        {type === "NONE" ||
                            (!confirmed && (
                                <Link
                                    to={"/auth"}
                                    className="text-gray-700 px-4 py-2 text-sm cursor-pointer max-w-[140px]"
                                >
                                    Продолжить регистрацию
                                </Link>
                            ))}

                        {isAuth && confirmed && (
                            <>
                                <Link
                                    to={`/profile/${type.toLowerCase()}/${id}`}
                                    className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                                    onClick={handleCloseUserMenu}
                                >
                                    Ваш профиль
                                </Link>
                                <Link
                                    to={`/tickets`}
                                    className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                                    onClick={handleCloseUserMenu}
                                >
                                    Ваши билеты
                                </Link>
                                {type === "COMPANY" && (
                                    <>
                                        <Link
                                            to={`/events`}
                                            className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                                            onClick={handleCloseUserMenu}
                                        >
                                            Ваши события
                                        </Link>
                                        <p
                                            className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                                            onClick={() => {
                                                setShowModal(true);
                                                handleCloseUserMenu();
                                            }}
                                        >
                                            Создать событие
                                        </p>
                                    </>
                                )}
                            </>
                        )}
                        {isAuth && (
                            <Link
                                to={"/favorite"}
                                className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                                onClick={handleCloseUserMenu}
                            >
                                Понравившиеся
                            </Link>
                        )}
                    </div>

                    <div
                        className="flex flex-col pt-1 border-t border-gray-400"
                        onClick={handleCloseUserMenu}
                    >
                        <p
                            onClick={() => {
                                dispatch(logOut());
                                logout();
                            }}
                            className="text-gray-700 px-4 py-2 text-sm cursor-pointer"
                        >
                            Выйти
                        </p>
                    </div>
                </Menu>
            </Box>
        </>
    );
};

const Header = () => {
    const { isAuth } = useSelector((state) => state.userReducer);

    return (
        <header className="select-none bg-gradient-to-r from-[#ED4690]/70 to-[#5522CC]/70 w-full h-full border-gray-200 px-4 lg:px-6 py-3 dark:bg-gray-800">
            <nav>
                <ul className="flex font-semibold text-white flex-wrap items-center justify-between mx-auto max-w-7xl">
                    <li>
                        <Link className="logo text-2xl font-serif" to="/">
                            uevent
                        </Link>
                    </li>

                    {isAuth ? (
                        <li>
                            <DropDown />
                        </li>
                    ) : (
                        <li>
                            <Link
                                className="px-3 py-2.5 font-serif border-gray-300 border rounded-lg hover:bg-white/10"
                                to="/auth"
                            >
                                Войти
                            </Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
