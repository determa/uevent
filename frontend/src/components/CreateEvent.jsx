import React, { useState } from "react";
import MaterialUIPickers from "./Date";
import dayjs from "dayjs";
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { PlaceComponent } from "./GoogleMapComponent";
import { eventAPI } from "../services/EventService";
import { themeAPI } from "../services/ThemeService";
import { categoryAPI } from "../services/CategoryService";

const SelectTheme = ({ setOption, setTags }) => {
    const { data } = themeAPI.useGetAllQuery();
    const selectHandler = (e) => {
        e.preventDefault();
        setOption(e.target.value);
        setTags("")
    };
    return (
        <>
            {data && (
                <TextField
                    required
                    label="Тема"
                    name="theme"
                    select
                    size="small"
                    onChange={selectHandler}
                    className="w-1/2"
                    defaultValue={""}
                >
                    {data.map((data) => (
                        <MenuItem key={data.id} value={data.id}>
                            {data.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        </>
    );
};

const SelectTags = ({ id, tags, setTags }) => {
    const { data } = categoryAPI.useGetAllCategoriesByThemeQuery(id);

    const selectHandler = (e) => {
        e.preventDefault();
        setTags(e.target.value);
    };

    return (
        <>
            {data && (
                <TextField
                    required
                    label="Категория"
                    name="category"
                    select
                    size="small"
                    className="w-1/2"
                    value={tags}
                    onChange={selectHandler}
                >
                    {data.map((data) => (
                        <MenuItem key={data.id} value={data.id}>
                            {data.name}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        </>
    );
};

const SelectorInput = ({ option, tags, setTags }) => {
    return (
        <>
            {option ? (
                <SelectTags id={option} tags={tags} setTags={setTags} />
            ) : (
                <TextField
                    required
                    label="Категория"
                    name="category"
                    size="small"
                    className="w-1/2"
                    defaultValue={""}
                    disabled
                />
            )}
        </>
    );
};

function CreateEvent({ setShowModal }) {
    const [create_event, { isError, error }] = eventAPI.useCreateMutation();
    let [location, setLocation] = useState(undefined);
    let [option, setOption] = useState(undefined);
    const [tags, setTags] = useState("");

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
        form.append("datePublish", selectedDatePublish);
        form.set(
            "location",
            JSON.stringify({ name: form.get("location"), location })
        );
        console.log(Object.fromEntries(form));
        const res = await create_event(form);
        console.log(res);
        if (!res.error) {
            document.body.style.overflowY = "auto";
            setShowModal(false);
        }
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
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        <img
                            src={`${process.env.REACT_APP_SERVER_DOMEN}/header.jpg`}
                            alt="img"
                            className="h-40 w-40 object-cover object-center"
                        />
                    </div>
                    <FormControl className="flex flex-1 flex-col gap-5">
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
                            className="border border-black border-opacity-25 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
                            placeholder="Описание"
                        />
                        <div className="flex gap-3">
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
                        </div>

                        <PlaceComponent setLocation={setLocation} />
                        <div className="flex gap-3">
                            <SelectTheme setOption={setOption} setTags={setTags} />
                            {
                                <SelectorInput
                                    option={option}
                                    tags={tags}
                                    setTags={setTags}
                                />
                            }
                        </div>

                        {/* <TextField
                            required
                            label="Кто может видеть список участников"
                            name="select"
                            select
                            size="small"
                        >
                            <MenuItem value="all">Все пользователи</MenuItem>
                            <MenuItem value="members">
                                Участники события
                            </MenuItem>
                        </TextField> */}

                        {/* <select
                            name="view"
                            className="w-full border border-black border-opacity-25 text-gray-900 p-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
                            required
                        >
                            <option value="all">Все пользователи</option>
                            <option value="confirmed">Учасники события</option>
                        </select> */}
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

                        {isError ? (
                            <span className="text-red-700 text-sm font-semibold text-center">
                                {error.data?.message}
                            </span>
                        ) : null}

                        <button
                            type="submit"
                            className="relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                        >
                            Add
                        </button>
                    </FormControl>
                </div>
            </form>
        </div>
    );
}

export default CreateEvent;
