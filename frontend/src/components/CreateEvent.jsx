import React, { useState } from "react";
import MaterialUIPickers from "./Date";
import dayjs from "dayjs";
import { FormControl, TextField } from "@mui/material";
import { PlaceComponent } from "./GoogleMapComponent";

function CreateEvent() {
    // const [create_event, { data, error: reg_er }] = eventAPI.useRegisterMutation();

    const [selectedDate, setSelectedDate] = useState(dayjs().add(1, "day").startOf("day"));

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
        <div className="flex flex-col gap-3 p-4 relative max-w-7xl mx-auto w-full">
            <h1 className="font-medium text-xl">Create Event</h1>
            <form
                className="flex flex-col gap-3"
                method="POST"
                onSubmit={handler}
            >
                <FormControl className="flex flex-col gap-5">
                    <TextField
                        required
                        label="Название"
                        size="small"
                        name="title"
                        type="text"
                        placeholder="Название"
                    />
                    <textarea
                        id="description"
                        name="description"
                        type="text"
                        required
                        className="border border-black border-opacity-25 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
                        placeholder="Описание"
                    />
                    <MaterialUIPickers
                        label={"Дата"}
                        handleChange={handleChangeDate}
                        value={selectedDate}
                    />

                    <PlaceComponent />

                    <TextField
                        required
                        label="Цена"
                        name="price"
                        size="small"
                        type="number"
                        placeholder="250"
                    />
                    <TextField
                        required
                        label="Количество билетов"
                        name="tickets_count"
                        size="small"
                        type="number"
                        placeholder="100"
                    />
                </FormControl>
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
