import React, { useState } from "react";
import MaterialUIPickers from "./Date";
import dayjs from "dayjs";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    MenuItem,
    TextField,
    Typography,
} from "@mui/material";
import { PlaceComponent } from "./GoogleMapComponent";
import { eventAPI } from "../services/EventService";
import previewImage from "../utils/previewImage";
import { indigo } from "@mui/material/colors";
import SelectorInputCategory from "./SelectorInputCategory";
import SelectTheme from "./SelectTheme";

function EditEvent({ setShowModal, data: event }) {
    const [update_event, { isError, error }] = eventAPI.useUpdateEventMutation();
    let [location, setLocation] = useState(JSON.parse(event.location));
    console.log(location);
    let [option, setOption] = useState(event.themeId);
    const [tags, setTags] = useState(event.categoryId);

    const [selectedDate, setSelectedDate] = useState(dayjs(event.date));
    const [selectedDatePublish, setSelectedDatePublish] = useState(
        dayjs(event.date_publish)
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
        form.set("location", JSON.stringify(location));
        console.log(event.id, Object.fromEntries(form));
        const res = await update_event({ id: event.id, data: form });
        console.log(res);
        if (!res.error) {
            document.body.style.overflowY = "auto";
            setShowModal(false);
        }
    }

    return (
        <div className="flex flex-col text-gray-800 gap-3 p-4 relative max-w-7xl mx-auto w-full">
            <h1 className="text-black text-center font-medium text-xl">
                Update Event
            </h1>
            <form
                className="flex flex-col gap-3"
                method="POST"
                onSubmit={handler}
            >
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3 w-52">
                        <label
                            htmlFor="avatar"
                            className="relative flex items-center justify-center h-52 rounded-lg bg-gray-400 text-gray-800 cursor-pointer hover:bg-gray-500"
                        >
                            <img
                                src={`${process.env.REACT_APP_SERVER_DOMEN}/${event.picture}`}
                                alt="img"
                                className="h-52 rounded-lg object-cover object-center"
                            />
                            <input
                                type="file"
                                name="avatar"
                                id="avatar"
                                className="hidden"
                                onChange={previewImage}
                            />
                            <div
                                id="preview"
                                className="absolute inset-0 rounded-lg overflow-hidden hidden"
                            ></div>
                        </label>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    defaultChecked={event.notification}
                                    sx={{
                                        "&.Mui-checked": {
                                            color: indigo[600],
                                        },
                                    }}
                                />
                            }
                            label={
                                <Typography
                                    className="text-justify"
                                    sx={{
                                        fontWeight: 600,
                                        fontSize: "13.5px",
                                    }}
                                >
                                    Получать уведомления о новых участниках?
                                </Typography>
                            }
                            name="notification"
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
                            defaultValue={event.title}
                        />
                        <textarea
                            id="description"
                            name="description"
                            type="text"
                            className="border border-black border-opacity-25 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
                            placeholder="Описание"
                            defaultValue={event.description}
                            required
                        />
                        <div className="flex gap-3">
                            <MaterialUIPickers
                                label={"Дата"}
                                handleChange={handleChangeDate}
                                value={selectedDate}
                                // minDate={dayjs().add(1, "day").startOf("day")}
                            />
                            <MaterialUIPickers
                                label={"Дата публикации"}
                                handleChange={handleChangeDatePublish}
                                value={selectedDatePublish}
                                // minDate={dayjs()}
                                maxDate={selectedDate}
                            />
                        </div>

                        <PlaceComponent
                            location={location}
                            setLocation={setLocation}
                        />
                        <div className="flex gap-3">
                            <SelectTheme
                                setOption={setOption}
                                setTags={setTags}
                            />
                            {
                                <SelectorInputCategory
                                    option={option}
                                    tags={tags}
                                    setTags={setTags}
                                />
                            }
                        </div>

                        <TextField
                            required
                            label="Кто может видеть список участников"
                            name="members_visibility"
                            select
                            size="small"
                            defaultValue={event.members_visibility}
                        >
                            <MenuItem value="all">Все пользователи</MenuItem>
                            <MenuItem value="members">
                                Участники события
                            </MenuItem>
                        </TextField>

                        <TextField
                            required
                            label="Цена"
                            name="price"
                            size="small"
                            type="number"
                            placeholder="250"
                            defaultValue={event.price}
                        />
                        <TextField
                            required
                            label="Количество билетов"
                            name="tickets_count"
                            size="small"
                            type="number"
                            placeholder="100"
                            defaultValue={event.tickets_count}
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
                            Изменить
                        </button>
                    </FormControl>
                </div>
            </form>
        </div>
    );
}

export default EditEvent;
