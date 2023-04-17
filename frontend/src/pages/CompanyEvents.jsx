import React from "react";
import { eventAPI } from "../services/EventService";
import { useSelector } from "react-redux";
import Event from "../components/Event";

const GetEvents = ({ id }) => {
    const { data: events } = eventAPI.useGetAllEventsByCompanyQuery(id);

    return (
        <>
            {events &&
                events.map((event, index) => (
                    <Event key={index} event={event} />
                ))}
        </>
    );
};

const CompanyEvents = () => {
    const { isAuth, id } = useSelector((state) => state.userReducer);

    return (
        <div className="flex flex-col gap-5 max-w-7xl mx-auto relative">
            <h1 className="font-medium text-xl">Ваши события:</h1>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {isAuth && <GetEvents id={id} />}
            </div>
        </div>
    );
};

export default CompanyEvents;
