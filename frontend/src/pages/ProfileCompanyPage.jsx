import React from "react";
import { useParams } from "react-router";
import { companyAPI } from "../services/CompanyService";
import GoogleMapComponent from "../components/GoogleMapComponent";
import { evnts } from "../components/dataList";
import Event from "../components/Event";

const ProfilePage = () => {
    const { id } = useParams();
    const { data } = companyAPI.useGetOneCompanyQuery(id);
    return (
        <>
            {data && (
                <>
                    <div className="flex flex-col gap-3 p-4 relative border border-gray-200 max-w-7xl mx-auto rounded-lg shadow-sm w-full after:absolute after:bg-gray-100 after:-z-10 after:block after:w-full after:content-[''] after:h-32 after:top-0 after:left-0 after:border-b">
                        <div className="flex justify-center">
                            <div className="bg-white p-1.5 rounded-full border border-gray-300">
                                <img
                                    className="w-40 h-40 rounded-full object-cover object-center backdrop-blur-sm"
                                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                                />
                            </div>
                        </div>
                        <p className="text-xl font-medium text-center">
                            {data.name}
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                            {data.createdAt}
                        </p>
                        <h1 className="font-semibold text-lg">О компании:</h1>
                        <p className="text-justify text-gray-800 text-sm">
                            {data.description}
                        </p>
                        {/* <div className="absolute w-96 h-96 right-1 top-1 bg-gray-400"></div> */}
                        <div className="flex w-1/2 h-96 mt-3">
                            <GoogleMapComponent
                                center={{ lat: 48.45, lng: 35.04 }}
                            />
                        </div>

                        <h1 className="font-semibold text-lg">События компании:</h1>
                        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                            {evnts.map((event) => (
                                <Event event={event} />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default ProfilePage;
