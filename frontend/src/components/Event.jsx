import React, { useState } from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faHeart } from "@fortawesome/free-solid-svg-icons";
import {
    faBell as farBell,
    faHeart as farHeart,
} from "@fortawesome/free-regular-svg-icons";

const NotifyComponent = () => {
    const [notify, setNotify] = useState(false);
    return (
        <>
            {notify ? (
                <FontAwesomeIcon
                    icon={faBell}
                    onClick={() => setNotify(!notify)}
                    className="absolute m-5 left-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-20"
                />
            ) : (
                <FontAwesomeIcon
                    icon={farBell}
                    onClick={() => setNotify(!notify)}
                    className="absolute m-5 left-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-20"
                />
            )}
        </>
    );
};

const FavoriteComponent = () => {
    const [favorite, setFavorite] = useState(false);

    return (
        <>
            {favorite ? (
                <FontAwesomeIcon
                    icon={faHeart}
                    onClick={() => setFavorite(!favorite)}
                    className="absolute m-5 right-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-20"
                />
            ) : (
                <FontAwesomeIcon
                    icon={farHeart}
                    onClick={() => setFavorite(!favorite)}
                    className="absolute m-5 right-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-20"
                />
            )}
        </>
    );
};

function Event({ event }) {
    return (
        <div className="relative select-none">
            <NotifyComponent />
            <FavoriteComponent />
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

                        <h3 className="text-xl font-semibold text-gray-700">
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
                        <p className="text-sm">
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
