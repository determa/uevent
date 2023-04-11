import React, { useState } from "react";
import Event from "./Event";
import { eventAPI } from "../services/EventService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
// import Pagination from "./Pagination";

const SortDropDown = ({ sort, setSort }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="h-fit leading-none relative border cursor-pointer border-black border-opacity-25 text-gray-900 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px]"
                onClick={() => {}}
            >
                <div
                    className="flex items-center justify-between gap-2 px-3 py-2.5 min-w-[135px]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p>{sort === "date" ? "Ближайшим" : "Популярным"}</p>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faChevronUp} size="xs" />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} size="xs" />
                    )}
                </div>

                {isOpen && (
                    <div
                        id="sett"
                        className="absolute right-0 z-10 mt-1 cursor-pointer min-w-[12rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                        <div
                            onClick={() => setSort("date")}
                            className="p-3 flex flex-col"
                        >
                            Популярным
                        </div>
                        <div
                            onClick={() => setSort("-date")}
                            className="p-3 flex flex-col border-t border-gray-400"
                        >
                            Ближайшим
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

const TagsDropDown = ({ allTags, tags, setTags }) => {
    const [isOpen, setIsOpen] = useState(false);
    console.log(allTags, "_-_", tags);
    const handler = () => {
        console.log("tyt");
    };
    return (
        <>
            <div
                className="h-fit leading-none relative border cursor-pointer border-black border-opacity-25 text-gray-900 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px]"
                onClick={() => {}}
            >
                <div
                    className="flex items-center justify-between gap-2 px-3 py-2.5 min-w-[120px]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p>{tags.length} Категории</p>
                    {isOpen ? (
                        <FontAwesomeIcon icon={faChevronUp} size="xs" />
                    ) : (
                        <FontAwesomeIcon icon={faChevronDown} size="xs" />
                    )}
                </div>

                {isOpen && (
                    <div
                        id="sett"
                        className="flex flex-col p-3 gap-3 overflow-auto max-h-40 absolute right-0 z-10 mt-1 cursor-pointer min-w-[8rem] rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5"
                    >
                        {allTags &&
                            allTags.map((data) => (
                                <div
                                    key={data.id}
                                    className="flex items-center"
                                >
                                    <input
                                        id={data.title}
                                        type="checkbox"
                                        className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor={data.title}
                                        className="ml-1.5 flex-1 text-sm font-medium text-gray-900"
                                    >
                                        {data.title}
                                    </label>
                                </div>
                            ))}
                    </div>
                )}
            </div>
        </>
    );
};

const Events = () => {
    const { data: events } = eventAPI.useGetAllEventsQuery();

    const allTags = [
        { id: 1, title: "Рок" },
        { id: 2, title: "Поп" },
        { id: 3, title: "Джаз" },
    ];

    const [limit] = useState(10);
    const [page, setPage] = useState(1);
    const [sort, setSort] = useState("date");
    const [tags, setTags] = useState([]);
    const sortHandler = () => {
        console.log(tags);
    };
    // const { data: posts, error } = API.useFetchAllPostsQuery({
    //     limit,
    //     page,
    //     sort,
    // });

    return (
        <>
            <div className="flex flex-col gap-6 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl">
                <div className="flex gap-3 select-none items-center">
                    <div className="flex gap-2 items-center">
                        <span>Сортировать по: </span>
                        <SortDropDown sort={sort} setSort={setSort} />
                    </div>

                    <TagsDropDown
                        allTags={allTags}
                        tags={tags}
                        setTags={setTags}
                    />

                    <button
                        onClick={sortHandler}
                        className="relative flex w-fit justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        применить
                    </button>
                </div>
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
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
