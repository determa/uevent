import React from "react";
import { userProfile } from "../components/dataList";

const ProfilePage = () => {
    return (
        <div className="flex flex-col gap-3 items-center p-4 relative border border-gray-200 max-w-7xl mx-auto rounded-lg shadow-sm w-full after:absolute after:bg-gray-100 after:-z-10 after:block after:w-full after:content-[''] after:h-32 after:top-0 after:left-0 after:border-b">
            <div className="flex justify-center">
                <div className="bg-white p-1.5 rounded-full border border-gray-300">
                    <img
                        className="w-40 h-40 rounded-full"
                        src="https://avatars.githubusercontent.com/u/47924507?v=4"
                    />
                </div>
            </div>
            <p className="text-xl font-medium">{userProfile[0].name}</p>
            <p className="text-gray-700 text-sm">{userProfile[0].email}</p>
            <p className="text-xs text-gray-500">{userProfile[0].createAt}</p>
        </div>
    );
};

export default ProfilePage;
