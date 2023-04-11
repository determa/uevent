import React from "react";

function Event({ event }) {
    console.log(event);
    return (
        <div
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
                <div className="flex flex-col gap-2">
                    <p className="text-xs">{event.date}</p>
                    <h3 className="text-xl font-semibold text-gray-700">
                        <a href={`/events/${event.id}`}>{event.title}</a>
                    </h3>
                    <p className="text-sm">{event.location}</p>
                </div>
                <p className="font-bold text-base">{event.price} грн</p>
            </div>
        </div>
    );
}

export default Event;
