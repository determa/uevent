import React, { useState } from "react";
import MaterialUIPickers from "./Date";
import dayjs from "dayjs";
import { FormControl, TextField } from "@mui/material";
import { PlaceComponent } from "./GoogleMapComponent";
import { eventAPI } from "../services/EventService";
import { themeAPI } from "../services/ThemeService";
import { categoryAPI } from "../services/CategoryService";

const SelectTheme = ({ option, setOption }) => {
    const { data } = themeAPI.useGetAllQuery();
    const selectHandler = (e) => {
        e.preventDefault();
        setOption(e.target.value);
    };
    return (
        <select
            name="theme"
            className="border border-black border-opacity-25 text-gray-900 p-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
            required
            value={option}
            onChange={selectHandler}
        >
            {data &&
                data.map((data) => (
                    <option key={data.id} value={data.id}>
                        {data.name}
                    </option>
                ))}
        </select>
    );
};

const SelectTags = ({ id, setTags }) => {
    const { data } = categoryAPI.useGetAllCategoriesByThemeQuery(id);
    console.log(id, data);
    return (
        <select
            name="theme"
            className="border border-black border-opacity-25 text-gray-900 p-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
        >
            {data &&
                data.map((data) => (
                    <option key={data.id} value={data.id}>
                        {data.name}
                    </option>
                ))}
        </select>
    );
};

function CreateEvent({ setShowModal }) {
    const [create_event, { data, error }] = eventAPI.useCreateMutation();
    let [location, setLocation] = useState(undefined);
    let [option, setOption] = useState(1);
    let [tags, setTags] = useState(1);
    const [selectedDate, setSelectedDate] = useState(
        dayjs().add(1, "day").startOf("day")
    );
    const [selectedDatePublish, setSelectedDatePublish] = useState(
        dayjs().startOf("day")
    );

    const handleChangeDate = (newValue) => {
        setSelectedDate(newValue);
    };

    const handleChangeDatePublish = (newValue) => {
        setSelectedDatePublish(newValue);
    };

    async function handler(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        form.append("date", selectedDate);
        form.set(
            "location",
            JSON.stringify({ name: form.get("location"), location })
        );
        console.log(Object.fromEntries(form));
        // const res = await create_event(form);
        // if (data) {
        //     console.log(res);
        //     setShowModal(true);
        // }
    }

    return (
        <div className="flex flex-col gap-3 p-4 relative max-w-7xl mx-auto w-full">
            <h1 className="text-black text-center font-medium text-xl">
                Create Event
            </h1>
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
                        minDate={dayjs().add(1, "day").startOf("day")}
                    />
                    <MaterialUIPickers
                        label={"Дата публикации"}
                        handleChange={handleChangeDatePublish}
                        value={selectedDatePublish}
                        minDate={dayjs()}
                        maxDate={selectedDate}
                    />

                    <PlaceComponent setLocation={setLocation} />

                    <SelectTheme option={option} setOption={setOption} />
                    <SelectTags id={option} />

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
                {error ? error.message : null}
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
