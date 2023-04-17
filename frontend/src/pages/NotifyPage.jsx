import React from "react";
import { notifyAPI } from "../services/NotifyService";
import Event from "../components/Event";
import NotifyCompany from "../components/NotifyCompany";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const AboutCompany = ({ data }) => {
    return (
        <div className="relative flex flex-col shadow-sm gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <div className="flex gap-3 justify-between">
                <h1 className="font-medium text-xl">Об организаторе:</h1>
                <NotifyCompany companyId={data.id} />
            </div>
            <p className="text-justify text-lg font-medium text-gray-800">
                <span className="text-sm">Название: </span>
                <Link to={`/profile/company/${data.id}`}>{data.name}</Link>
            </p>
            <p className="text-justify text-gray-800">
                <span className="text-sm ">Email: </span>
                <a
                    className="font-medium"
                    href={`mailto:${data.account.email}`}
                >
                    {data.account.email}
                </a>
            </p>
        </div>
    );
};

const NotifyPage = () => {
    // const { data: events } = favoriteAPI.useGetFavoriteEventsQuery();
    const { data: events } = notifyAPI.useGetEventsNotifyQuery();
    const { data: companies } = notifyAPI.useGetCompaniesNotifyQuery();
    const { isAuth, type } = useSelector((state) => state.userReducer);

    return (
        <div className="flex flex-col gap-5 max-w-7xl mx-auto relative">
            <h1 className="font-medium text-xl">Уведомления на события:</h1>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {events &&
                    events.map((element, index) => (
                        <Event key={index} event={element.event} />
                    ))}
            </div>
                {companies.length === 0 && (
                    <h1 className="text-center">Нет уведомлений.</h1>
                )}
            {isAuth && type === "USER" && (
                <div className="mt-8 flex flex-col gap-5">
                    <h1 className="font-medium text-xl">
                        Уведомления на компании:
                    </h1>
                    <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                        {companies &&
                            companies.map((element, index) => (
                                <AboutCompany key={index} data={element} />
                            ))}
                    </div>
                    {companies.length === 0 && (
                        <h1 className="text-center">Нет уведомлений.</h1>
                    )}
                </div>
            )}
        </div>
    );
};

export default NotifyPage;
