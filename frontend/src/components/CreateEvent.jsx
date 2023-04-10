import React, { useState } from "react";
import MaterialUIPickers from "./Date";
import dayjs from "dayjs";
import { FormControl, TextField } from "@mui/material";
import { PlaceComponent } from "./GoogleMapComponent";
import { eventAPI } from "../services/EventService";

const SelectTheme = ({ option, setOption }) => {
    const selectHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value);
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
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
            <option value={4}>Four</option>
            <option value={5}>Five</option>
            <option value={6}>Six</option>
            <option value={7}>Seven</option>
            <option value={8}>Eight</option>
        </select>
    );
};

const SelectTags = ({ id }) => {
    //query

    return (
        <select
            name="theme"
            className="border border-black border-opacity-25 text-gray-900 p-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
        >
            <option value={1}>One</option>
            <option value={2}>Two</option>
            <option value={3}>Three</option>
        </select>
    );
};

function CreateEvent({ setShowModal }) {
    const [create_event, { data, error }] = eventAPI.useCreateMutation();
    let [location, setLocation] = useState(undefined);
    let [option, setOption] = useState(1);
    const [selectedDate, setSelectedDate] = useState(
        dayjs().add(1, "day").startOf("day")
    );

    const handleChangeDate = (newValue) => {
        setSelectedDate(newValue);
    };

    const selectHandler = (e) => {
        e.preventDefault();
        console.log(e.target.value);
        setOption(e.target.value);
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
