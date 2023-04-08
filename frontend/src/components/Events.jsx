import React from "react";
import { evnts } from "./dataList";
import Event from "./Event";
// import Pagination from "./Pagination";

const Events = () => {
    return (
        <div className="flex flex-col gap-6 mx-auto max-w-2xl lg:max-w-7xl mb-12">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Customers also purchased
            </h2>

            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {evnts.map((event) => (
                    <Event event={event} />
                ))}
            </div>

            {/* <Pagination /> */}
        </div>
    );
};

export default Events;
