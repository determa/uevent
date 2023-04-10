import React from "react";
import { Navigate, useParams } from "react-router";
// import { userProfile } from "../components/dataList";
import { userAPI } from "../services/UserService";
import { useSelector } from "react-redux";

const ProfilePage = () => {
    const { id } = useParams();
    const { data } = userAPI.useGetOneUserQuery(id);
    const { type, confirmed } = useSelector((state) => state.userReducer);
    if (type === "NONE" || !confirmed) {
        return <Navigate to={"/auth"} replace />;
    }
    return (
        <>
            {data && (
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
                    <p className="text-xs text-gray-500">{data.createdAt}</p>
                </div>
            )}
        </>
    );
};

export default ProfilePage;
