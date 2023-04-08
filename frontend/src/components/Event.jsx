import React from "react";

function Event({ event }) {
    return (
        <div
            key={event.id}
            className="group relative rounded-lg bg-white drop-shadow-[0_19px_47px_rgba(119,115,170,0.1)]"
        >
            <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                <img
                    src={event.imageSrc}
                    alt={event.imageAlt}
                    className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
            </div>
            <div className="flex p-6 flex-col gap-2">
                <p className="text-xs">{event.date}</p>
                <div className="flex justify-between items-center">
                    <h3 className="text-xl font-semibold text-gray-700">
                        <a href={event.href}>{event.name}</a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">{event.color}</p>
                    <p className="text-sm font-medium text-gray-900">
                        {event.price}
                    </p>
                </div>
                <p className="text-sm">{event.place}</p>
                <p className="font-bold text-sm">{event.price}</p>
            </div>
        </div>
    );
}

export default Event;
