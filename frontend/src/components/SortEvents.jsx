import React from "react";
import {
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { themeAPI } from "../services/ThemeService";
import { categoryAPI } from "../services/CategoryService";

const SortDropDown = ({ sort, setSort }) => {
    return (
        <TextField
            required
            label="Сортировка"
            select
            size="small"
            value={sort}
            defaultValue={"date"}
            onChange={(e) => setSort(e.target.value)}
        >
            <MenuItem value="-date">Ближайшим</MenuItem>
            <MenuItem value="date">Популярным</MenuItem>
        </TextField>
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
                        renderValue={(selected) =>
                            selected.map((value) => value.name).join(", ")
                        }
                    >
                        {data.map((data) => (
                            <MenuItem key={data.id} value={data}>
                                <Checkbox checked={value.indexOf(data) > -1} />
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
                        renderValue={(selected) =>
                            selected.map((value) => value.name).join(", ")
                        }
                    >
                        {data.map((data) => (
                            <MenuItem key={data.id} value={data}>
                                <Checkbox checked={value.indexOf(data) > -1} />
                                <ListItemText primary={data.name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            )}
        </>
    );
};

const SortEvents = ({ setIdTheme, setIdCategoryd, sort, setSort }) => {
    const [valueTheme, setValueTheme] = React.useState([]);
    const [valueCategory, setValueCategory] = React.useState([]);

    const handler = (event, setter, IdSetter) => {
        const {
            target: { value },
        } = event;
        setter(
            // On autofill we get a stringified value.
            typeof value === "string" ? value.split(",") : value
        );
        IdSetter(value.map((value) => value.id));
        console.log(value);
    };
    return (
        <div className="flex gap-3 select-none items-center">
            <div className="flex gap-2 items-center">
                <span>Сортировать по: </span>
                <SortDropDown sort={sort} setSort={setSort} />
            </div>

            <MultipleSelectThemes
                handler={handler}
                setter={setValueTheme}
                value={valueTheme}
                IdSetter={setIdTheme}
            />
            <MultipleSelectCategories
                handler={handler}
                setter={setValueCategory}
                value={valueCategory}
                IdSetter={setIdCategoryd}
            />

            <button className="relative flex w-fit justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500">
                применить
            </button>
        </div>
    );
};

export {
    MultipleSelectCategories,
    MultipleSelectThemes,
    SortDropDown,
    SortEvents,
};
