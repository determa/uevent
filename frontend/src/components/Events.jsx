import React, { useState } from "react";
import Event from "./Event";
import { eventAPI } from "../services/EventService";
import { SortEvents } from "./SortEvents";

const Events = () => {
    const [idTheme, setIdTheme] = React.useState([]);
    const [idCategory, setIdCategoryd] = React.useState([]);
    const [sort, setSort] = useState("-date");
    const [page, setPage] = useState(1); // for pagination
    const { data: events } = eventAPI.useGetAllEventsQuery({
        themes: idTheme,
        categories: idCategory,
        sort,
        page,
    });

    return (
        <>
            <div className="flex flex-col gap-6 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl">
                <SortEvents
                    setIdTheme={setIdTheme}
                    setIdCategoryd={setIdCategoryd}
                    sort={sort}
                    setSort={setSort}
                />
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    {events &&
                        events.map((event, index) => (
                            <Event key={index} event={event} />
                        ))}
                </div>

                {/* <Pagination /> */}
            </div>
        </>
    );
};

export default Events;
