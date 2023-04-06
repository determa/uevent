import React from "react";
import { useParams } from "react-router";
import { evnts } from "../components/dataList";

const EventPage = () => {
    const { id } = useParams();
    const event = evnts[id - 1];

    return (
        <>
            <div className="flex shadow-sm justify-center gap-3 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                <img
                    className="rounded-lg h-80 w-56 object-cover object-center"
                    alt="afisha"
                    src={event.imageSrc}
                />
                <div className="flex flex-1 flex-col p-4 gap-3">
                    <p className="text-sm text-gray-500 font-semibold">
                        {event.date}
                    </p>
                    <div className="flex-1">
                        <h1 className="py-4 text-4xl font-medium">
                            {event.name}
                        </h1>
                        <p className="text-sm">{event.place}</p>
                    </div>
                    <div className="flex gap-3">
                        {event.categories.map((category, index) => (
                            <p key={index} className="px-3 py-1 bg-black/20">
                                {category}
                            </p>
                        ))}
                    </div>
                    <div>
                        <p className="font-bold text-gray-700">{event.price}</p>
                        <button className="mt-3 relative flex w-28 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500">
                            Buy
                        </button>
                    </div>
                </div>
            </div>
            <div className="mt-4 flex shadow-sm gap-3 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                <h1 className="font-medium text-xl">Описание</h1>
                <p className="text-justify text-gray-800">
                    {event.description}
                </p>
            </div>
        </>
    );
};

export default EventPage;
