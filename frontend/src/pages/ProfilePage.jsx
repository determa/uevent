import React from "react";
import { useParams } from "react-router";
import { userAPI } from "../services/UserService";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { commentAPI } from "../services/CommentService";
import { useSelector } from "react-redux";
import SettingButton from "../components/SettingButton";
import { EditUserProfile } from "../components/EditProfile";

const CommentComponent = ({ user }) => {
    const { data: comments, isError } = commentAPI.useGetCommentsByAccountQuery(
        { id: user.accountId }
    );
    return (
        <>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {comments &&
                    comments.map((data, index) => (
                        <Link
                            key={index}
                            to={`/events/${data.eventId}`}
                            className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:outline hover:outline-[#5522CC]/70 hover:duration-150"
                        >
                            <div className="flex gap-3">
                                <img
                                    className="rounded-xl border border-gray-300 object-cover object-center backdrop-blur-sm w-12 h-12"
                                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${user.picture}`}
                                    alt="pic"
                                />
                                <div className="flex flex-col justify-center">
                                    <p className="font-medium text-sm text-gray-700">
                                        {user.name}
                                    </p>
                                    <p className="font-semibold text-base">
                                        {data.event.title}
                                    </p>
                                </div>
                            </div>
                            <div className="line-clamp-3 flex-1">
                                {data.content}
                            </div>
                            <span className="text-sm text-gray-600">
                                {dayjs(data.createAt).format(
                                    "DD MMMM YYYY HH:mm"
                                )}
                            </span>
                        </Link>
                    ))}
            </div>
            {isError && (
                <h1 className="text-center mt-10">Нет комментириев.</h1>
            )}
        </>
    );
};

const ProfilePage = () => {
    const { id } = useParams();
    const { data } = userAPI.useGetOneUserQuery(id);
    const { isAuth, accountId } = useSelector((state) => state.userReducer);

    return (
        <>
            {data && (
                <>
                    <div className="flex flex-col gap-3 items-center p-4 relative border border-gray-200 max-w-7xl mx-auto rounded-lg shadow-sm w-full after:absolute after:bg-gray-100 after:-z-10 after:block after:w-full after:content-[''] after:h-32 after:top-0 after:left-0 after:border-b">
                        {isAuth && accountId === data.accountId && (
                            <div className="absolute top-0 right-0 z-10 p-3">
                                <SettingButton
                                    component={EditUserProfile}
                                    data={data}
                                />
                            </div>
                        )}
                        <div className="flex justify-center">
                            <div className="bg-white p-1.5 rounded-full border border-gray-300">
                                <img
                                    className="w-40 h-40 rounded-full object-cover object-center backdrop-blur-sm"
                                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                                    alt="pic"
                                />
                            </div>
                        </div>
                        <p className="text-xl font-medium">{data.name}</p>
                        {/* <p className="text-gray-700 text-sm">{data.email}</p> */}
                        <p className="text-xs text-gray-500 text-center">
                            <span>Зарегистрирован </span>
                            {dayjs(data.createdAt).format("DD MMMM YYYY HH:mm")}
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 max-w-7xl mx-auto flex-wrap">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-900">
                            Последние комментарии:
                        </h2>
                        <CommentComponent user={data} />
                    </div>
                </>
            )}
        </>
    );
};

export default ProfilePage;
