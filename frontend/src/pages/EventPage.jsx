import React from "react";
import { useParams } from "react-router";
import { evnts } from "../components/dataList";

const EventPage = () => {
    const { id } = useParams();
    const event = evnts[id];
    return (
        <div className="flex py-12 gap-3 px-4 justify-center">
            <img className="rounded-lg" src={event.imageSrc} />
            <div className="flex flex-col p-3 bg-white border border-gray-200 rounded-lg gap-3 h-fit">
                <p className="text-sm rounded-lg p-3 text-white bg-[#ED4690]/70">
                    {event.date}
                </p>
                <h1 className="text-5xl">{event.name}</h1>
                <p className="text-sm">{event.place}</p>
                <p className="text-sm font-bold">{event.price}</p>
                <button className="bg-purp text-white p-3 rounded-lg">
                    buy
                </button>
            </div>
        </div>
    );
};

export default EventPage;
