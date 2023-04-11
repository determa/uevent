import React, { useState } from "react";
import { evnts } from "./dataList";
import Event from "./Event";
// import Pagination from "./Pagination";

const Events = ({ events }) => {
    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("date");

    // const { data: posts, error } = API.useFetchAllPostsQuery({
    //     limit,
    //     page,
    //     sort,
    // });

    return (
        <>
            <div className="flex flex-col gap-6 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl mb-12">
                <div className="">
                    <span>Сортировать по: </span>
                    <select
                        className="border border-black border-opacity-25 text-gray-900 p-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
                        defaultValue="date"
                        onChange={(e) => {
                            setSort(e.target.value);
                        }}
                    >
                        <option value={"date"}>Популярным</option>
                        <option value={"-date"}>Ближайшим</option>
                    </select>
                </div>

                <div class="flex items-center mb-4">
                    <input
                        id="checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                        for="checkbox"
                        class="ml-2 text-sm font-medium text-gray-900"
                    >
                        Рок
                    </label>
                    <input
                        id="checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                        for="checkbox"
                        class="ml-2 text-sm font-medium text-gray-900"
                    >
                        Поп
                    </label>
                    <input
                        id="checkbox"
                        type="checkbox"
                        value=""
                        class="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                    />
                    <label
                        for="checkbox"
                        class="ml-2 text-sm font-medium text-gray-900"
                    >
                        Джаз
                    </label>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                    {evnts.map((event, index) => (
                        <Event key={index} event={event} />
                    ))}
                </div>

                {/* <Pagination /> */}
            </div>
        </>
    );
};

export default Events;
