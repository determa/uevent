import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import FavoriteComponent from "./FavoriteComponent";
import NotifyComponent from "./NotifyComponent";
import { useSelector } from "react-redux";

function Event({ event }) {
    const { isAuth } = useSelector((state) => state.userReducer);

    return (
        <div className="relative select-none">
            {isAuth && (
                <>
                    <NotifyComponent eventId={event.id} />
                    <FavoriteComponent eventId={event.id} />
                </>
            )}
            <Link
                to={`/events/${event.id}`}
                key={event.id}
                className="flex flex-col hover:opacity-75 relative rounded-lg bg-white drop-shadow-[0_19px_47px_rgba(119,115,170,0.1)]"
            >
                <div className="min-h-80 w-full overflow-hidden rounded-t-lg bg-gray-200 lg:h-80">
                    <img
                        src={`${process.env.REACT_APP_SERVER_DOMEN}/${event.picture}`}
                        alt="img"
                        className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="flex-1 flex flex-col p-6 gap-2 justify-between flex-wrap">
                    <div className="flex flex-col gap-5 w-full">
                        <div className="flex justify-between items-end">
                            <p className="text-xs font-medium">
                                {dayjs(event.date).format("ddd, DD MMM YYYY")}
                            </p>
                            <p className="text-sm font-semibold">
                                {dayjs(event.date).format("HH:mm")}
                            </p>
                        </div>

                        <h3 className="text-xl font-semibold text-gray-700 line-clamp-3">
                            {event.title}
                        </h3>
                    </div>
                    {/* <div className="flex gap-3">
                    <p className="px-3 py-1 bg-black/20">{event.theme.name}</p>
                    <p className="px-3 py-1 bg-black/20">
                        {event.category.name}
                    </p>
                </div> */}
                    <div className="flex flex-col gap-3">
                        <p className="text-sm line-clamp-1">
                            {JSON.parse(event.location).name}
                        </p>
                        <p className="font-bold text-base">{event.price} грн</p>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default Event;
