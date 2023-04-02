import React from "react";

const SearchTicket = () => {
    return (
        <div className="flex justify-center items-center relative -translate-y-1/2">
            <div className="flex flex-wrap justify-center bg-[#242565] px-12 py-8 gap-12 rounded-lg shadow-gray-700 shadow-sm">
                <div className="flex flex-col">
                    <label htmlFor="search" className="text-white text-xs">
                        Search Event
                    </label>
                    <input
                        id="search"
                        name="search"
                        type="text"
                        required
                        className="bg-[#242565] border-b-2 duration-300 border-gray-400 text-white py-1 placeholder:text-gray-100 outline-none outline-offset-0 hover:border-indigo-400 focus:border-white sm:text-sm sm:leading-6"
                        placeholder="Jazz"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="place" className="text-white text-xs">
                        Place
                    </label>
                    <input
                        id="place"
                        name="place"
                        type="text"
                        required
                        className="bg-[#242565] border-b-2 duration-300 border-gray-400 text-white py-1 placeholder:text-gray-100 outline-none outline-offset-0 hover:border-indigo-400 focus:border-white sm:text-sm sm:leading-6"
                        placeholder="Dnipro"
                    />
                </div>
                <div className="flex flex-col">
                    <label htmlFor="time" className="text-white text-xs">
                        Time
                    </label>
                    <input
                        id="time"
                        name="time"
                        type="text"
                        required
                        className="bg-[#242565] border-b-2 duration-300 border-gray-400 text-white py-1 placeholder:text-gray-100 outline-none outline-offset-0 hover:border-indigo-400 focus:border-white sm:text-sm sm:leading-6"
                        placeholder="Any date"
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchTicket;
