import React from "react";
import { useParams } from "react-router";
import { companyAPI } from "../services/CompanyService";
import { GoogleMapComponent } from "../components/GoogleMapComponent";
import Event from "../components/Event";
import { eventAPI } from "../services/EventService";
import NotifyCompany from "../components/NotifyCompany";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const ProfilePage = () => {
    const { id } = useParams();
    const { data } = companyAPI.useGetOneCompanyQuery(id);
    const { data: events } = eventAPI.useGetAllEventsByCompanyQuery(id);
    const { isAuth, accountId } = useSelector((state) => state.userReducer);
    return (
        <>
            {data && (
                <div className="flex flex-col gap-7 max-w-7xl mx-auto">
                    <div className="flex flex-col gap-3 p-4 relative border border-gray-200 rounded-lg shadow-sm w-full after:absolute after:bg-gray-100 after:-z-10 after:block after:w-full after:content-[''] after:h-32 after:top-0 after:left-0 after:border-b">
                        <div className="absolute m-5 left-0 top-0">
                            <NotifyCompany companyId={data.id} />
                        </div>
                        {isAuth && accountId === data.accountId && (
                            <p className="absolute top-0 right-0 mx-4 mt-3 text-sm font-semibold text-blue-600 hover:text-blue-900 cursor-pointer tracking-wider">
                                edit
                            </p>
                        )}
                        <div className="flex justify-center">
                            <div className="bg-white p-1.5 rounded-xl border border-gray-300">
                                <img
                                    className="h-40 rounded-md object-cover object-center backdrop-blur-sm"
                                    alt="img"
                                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                                />
                            </div>
                        </div>
                        <p className="text-xl font-medium text-center">
                            {data.name}
                        </p>
                        <p className="text-xs text-gray-500 text-center">
                            <span>Зарегистрирован </span>
                            {dayjs(data.createdAt).format("DD MMMM YYYY HH:mm")}
                        </p>
                    </div>
                    <div className="flex justify-between gap-3 flex-wrap">
                        <div className="flex flex-col gap-3 flex-1 p-4 border border-gray-200 rounded-lg shadow-sm w-full">
                            <h1 className="font-semibold text-lg">
                                О компании:
                            </h1>
                            <p className="text-justify text-gray-800 text-sm">
                                {data.description}
                            </p>
                        </div>
                        <div className="flex w-full md:w-2/5 h-72 p-4 border border-gray-200 rounded-lg shadow-sm">
                            <GoogleMapComponent
                                center={JSON.parse(data.location).location}
                            />
                        </div>
                    </div>
                    {/* <div className="flex flex-col gap-3 p-4 relative border border-gray-200 max-w-7xl mx-auto rounded-lg shadow-sm w-full"> */}
                    <div className="max-w-7xl mx-auto grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                        {events &&
                            events.map((event, index) => (
                                <Event key={index} event={event} />
                            ))}
                    </div>
                    {/* </div> */}
                </div>
            )}
        </>
    );
};

export default ProfilePage;
