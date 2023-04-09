import React, { useState } from "react";
import MaterialUIPickers from "../components/Date";
import dayjs from "dayjs";
import LocationInput from "../components/LocationInput";

function CreateEvent() {
    // const [create_event, { data, error: reg_er }] = eventAPI.useRegisterMutation();

    const [selectedDate, setSelectedDate] = useState(dayjs(null).startOf("D"));

    const handleChangeDate = (newValue) => {
        setSelectedDate(newValue);
    };

    async function handler(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append("date", selectedDate);
        console.log(Object.fromEntries(formData));
        // const res = await create_event(new FormData(e.target));
        // if (!res.error) dispatch(setCredentials(res));
    }

    return (
        <div className="flex flex-col gap-3 p-4 relative border border-gray-200 max-w-7xl mx-auto rounded-lg shadow-sm w-full">
            <form
                className="flex flex-col gap-3"
                method="POST"
                onSubmit={handler}
            >
                <input
                    id="title"
                    name="title"
                    type="text"
                    required
                    className="border-2 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="Enter title"
                />
                <textarea
                    id="description"
                    name="description"
                    type="text"
                    required
                    className="border-2 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="description"
                />
                <MaterialUIPickers
                    label={"Date"}
                    handleChange={handleChangeDate}
                    value={selectedDate}
                />

                <LocationInput />
                <input
                    id="price"
                    name="price"
                    type="number"
                    required
                    className="border-2 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="250"
                />
                <input
                    id="tickets_count"
                    name="tickets_count"
                    type="number"
                    required
                    className="border-2 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                    placeholder="100"
                />
                <button
                    type="submit"
                    className="relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                    Add
                </button>
            </form>
        </div>
    );
}

export default CreateEvent;
