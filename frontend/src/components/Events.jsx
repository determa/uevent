import React, { useState } from "react";
import Event from "./Event";
import { eventAPI } from "../services/EventService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import {
    Checkbox,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from "@mui/material";
import { themeAPI } from "../services/ThemeService";
import { categoryAPI } from "../services/CategoryService";
// import Pagination from "./Pagination";

const SortDropDown = ({ sort, setSort }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div
                className="h-fit leading-none relative border cursor-pointer border-black border-opacity-25 text-gray-900 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px]"
                onClick={() => { }}
            >
                <div
                    className="flex items-center justify-between gap-2 px-3 py-2.5 min-w-[135px]"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <p>{sort === "-date" ? "Ближайшим" : "Популярным"}</p>
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
                        <p
                            onClick={() => {
                                setSort("-date");
                                setIsOpen(!isOpen);
                            }}
                            className="p-3 flex flex-col"
                        >
                            Ближайшим
                        </p>
                        <p
                            onClick={() => {
                                setSort("date");
                                setIsOpen(!isOpen);
                            }}
                            className="p-3 flex flex-col border-t border-gray-400"
                        >
                            Популярным
                        </p>
                    </div>
                )}
            </div>
        </>
    );
};

const MultipleSelectThemes = ({ handler, setter, value, IdSetter }) => {
    const { data } = themeAPI.useGetAllQuery();

    return (
        <>
            {data && (
                <FormControl sx={{ width: 250 }} size="small">
                    <InputLabel id="theme-label">Темы</InputLabel>
                    <Select
                        labelId="theme-label"
                        id="themes"
                        name="themes"
                        multiple
                        value={value}
                        label="Темы"
                        onChange={(e) => handler(e, setter, IdSetter)}
                        renderValue={(selected) => selected.map((value) => value.name).join(", ")}
                    >
                        {data.map((data) => (
                            <MenuItem key={data.id} value={data}>
                                <Checkbox
                                    checked={
                                        value.indexOf(data) > -1
                                    }
                                />
                                <ListItemText primary={data.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );
};

const MultipleSelectCategories = ({ handler, setter, value, IdSetter }) => {
    const { data } = categoryAPI.useGetAllCategoriesQuery();

    return (
        <>
            {data && (
                <FormControl sx={{ width: 250 }} size="small">
                    <InputLabel id="categories-label">Категории</InputLabel>
                    <Select
                        labelId="categories-label"
                        id="categories"
                        name="categories"
                        multiple
                        value={value}
                        label="Категории"
                        onChange={(e) => handler(e, setter, IdSetter)}
                        renderValue={(selected) => selected.map((value) => value.name).join(", ")}
                    >
                        {data.map((data) => (
                            <MenuItem key={data.id} value={data}>
                                <Checkbox
                                    checked={
                                        value.indexOf(data) > -1
                                    }
                                />
                                <ListItemText primary={data.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );
};

const Events = () => {
    const [valueTheme, setValueTheme] = React.useState([]);
    const [valueCategory, setValueCategory] = React.useState([]);
    const [idTheme, setIdTheme] = React.useState([]);
    const [idCategory, setIdCategoryd] = React.useState([]);
    const [sort, setSort] = useState("date");
    const [page, setPage] = useState(1); // for pagination
    const { data: events } = eventAPI.useGetAllEventsQuery({ themes: idTheme, categories: idCategory, sort, page });


    const handler = (event, setter, IdSetter) => {
        const {
            target: { value },
        } = event;
        setter(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        IdSetter(value.map((value) => value.id))
        console.log(value);
    };

    return (
        <>
            <div className="flex flex-col gap-6 mx-auto max-w-2xl md:max-w-4xl lg:max-w-7xl">
                <div className="flex gap-3 select-none items-center">
                    {/* <FormControl className="flex gap-5"> */}
                    <div className="flex gap-2 items-center">
                        <span>Сортировать по: </span>
                        <SortDropDown sort={sort} setSort={setSort} />
                    </div>

                    {/* <TagsDropDown allTags={allTags} tags={tags} /> */}
                    <MultipleSelectThemes handler={handler} setter={setValueTheme} value={valueTheme} IdSetter={setIdTheme} />
                    <MultipleSelectCategories handler={handler} setter={setValueCategory} value={valueCategory} IdSetter={setIdCategoryd} />

                    <button
                        // onClick={sortHandler}
                        className="relative flex w-fit justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        применить
                    </button>
                    {/* </FormControl> */}
                </div>
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
