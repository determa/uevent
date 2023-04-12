import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

function Event({ event }) {
    return (
        <Link
            to={`/events/${event.id}`}
            key={event.id}
            className="group relative rounded-lg bg-white drop-shadow-[0_19px_47px_rgba(119,115,170,0.1)]"
        >
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${event.picture}`}
                    alt="img"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="flex p-6 gap-2 justify-between flex-wrap">
                <div className="flex flex-col gap-3">
                    <div className="flex justify-between items-end">
                        <p className="text-xs font-medium">
                            {dayjs(event.date).format("ddd, DD-MMM-YYYY")}
                        </p>
                        <p className="text-sm font-semibold">
                            {dayjs(event.date).format("HH:mm")}
                        </p>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-700">
                        {event.title}
                    </h3>
                    <p className="text-sm">{JSON.parse(event.location).name}</p>
                </div>
                <p className="font-bold text-base">{event.price} грн</p>
            </div>
        </Link>
    );
}

export default Event;
