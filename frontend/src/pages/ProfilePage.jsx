import React from "react";
import { useParams } from "react-router";
import { userAPI } from "../services/UserService";
import { comments, userComments } from "../components/dataList";
import CommentComponent from "../components/CommentComponent";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const ProfilePage = () => {
    const { id } = useParams();
    const { data } = userAPI.useGetOneUserQuery(id);
    return (
        <>
            {data && (
                <>
                    <div className="flex flex-col gap-3 items-center p-4 relative border border-gray-200 max-w-7xl mx-auto rounded-lg shadow-sm w-full after:absolute after:bg-gray-100 after:-z-10 after:block after:w-full after:content-[''] after:h-32 after:top-0 after:left-0 after:border-b">
                        <div className="flex justify-center">
                            <div className="bg-white p-1.5 rounded-full border border-gray-300">
                                <img
                                    className="w-40 h-40 rounded-full object-cover object-center backdrop-blur-sm"
                                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                                />
                            </div>
                        </div>
                        <p className="text-xl font-medium">{data.name}</p>
                        {/* <p className="text-gray-700 text-sm">{data.email}</p> */}
                        <p className="text-xs text-gray-500">
                            {data.createdAt}
                        </p>
                    </div>
                    <div className="mt-8 flex flex-col gap-3 max-w-7xl mx-auto flex-wrap">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-900">
                            Последние комментарии:
                        </h2>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {userComments &&
                                userComments.map((data) => (
                                    <Link
                                        key={data.id}
                                        to={`/events/${data.event.id}`}
                                        className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-gray-200 hover:outline hover:outline-[#5522CC]/70 hover:duration-150"
                                    >
                                        <div className="flex gap-3">
                                            <img
                                                className="rounded-xl border border-gray-300 object-cover object-center backdrop-blur-sm w-12 h-12"
                                                src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.user.picture}`}
                                            />
                                            <div className="flex flex-col justify-center">
                                                <p className="font-medium text-sm text-gray-700">
                                                    {data.user.name}
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
                    </div>
                </>
            )}
        </>
    );
};

export default ProfilePage;
