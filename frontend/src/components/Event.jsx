import React from "react";

function Event({ event }) {
    return (
        <div
            key={event.id}
            className="group relative rounded-lg bg-white drop-shadow-[0_19px_47px_rgba(119,115,170,0.1)]"
        >
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                    src={event.picture}
                    alt="img"
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="flex p-6  justify-between items-center gap-2">
                <div className="flex flex-col gap-2">
                    <p className="text-xs">{event.date}</p>
                    <h3 className="text-xl font-semibold text-gray-700">
                        <a href={`/events/${event.id}`}>{event.name}</a>
                    </h3>
                    <p className="text-sm">{event.place}</p>
                </div>
                <p className="flex-1 font-bold text-base">{event.price} грн</p>
            </div>
        </div>
    );
}

export default Event;
