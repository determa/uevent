import React from "react";
import { favoriteAPI } from "../services/FavoriteService";
import Event from "../components/Event";

const FavoritePage = () => {
    const { data: events } = favoriteAPI.useGetFavoriteEventsQuery();
    return (
        <div className="flex flex-col gap-5 max-w-7xl mx-auto relative">
            <h1 className="font-medium text-xl">Понравившиеся события:</h1>
            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {events &&
                    events.map((event, index) => (
                        <Event key={index} event={event} />
                    ))}
            </div>
        </div>
    );
};

export default FavoritePage;
