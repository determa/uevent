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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function BasicDatePicker({ label, handler, minDate, maxDate }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
                format="DD/MM/YYYY"
                label={label}
                ampm={false}
                onChange={handler}
                minDate={minDate}
                maxDate={maxDate}
                className="bg-white rounded-md"
                slotProps={{ textField: { size: "small" } }}
                sx={{ minWidth: 200 }}
            />
        </LocalizationProvider>
    );
}

const SortDropDown = ({ sort, setSort }) => {
    return (
        <TextField
            required
            label="Сортировка"
            select
            size="small"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="min-w-[80px]"
        >
            <MenuItem value="date">Ближайшим</MenuItem>
            <MenuItem value="-price">От дешевых</MenuItem>
            <MenuItem value="price">От дорогих</MenuItem>
        </TextField>
    );
};

const MultipleSelectThemes = ({ handler, setter, value, IdSetter }) => {
    const { data } = themeAPI.useGetAllQuery();

    return (
        <>
            {data && (
                <FormControl sx={{ minWidth: 200 }} size="small">
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
                <FormControl sx={{ minWidth: 200 }} size="small">
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

const SortEvents = ({
    setIdTheme,
    setIdCategoryd,
    sort,
    setSort,
    setSelectedDateFrom,
    setSelectedDateTo,
    selectedDateFrom,
    selectedDateTo,
}) => {
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

    const handleDateFrom = (newValue) => {
        setSelectedDateFrom(newValue);
    };

    const handleDateTo = (newValue) => {
        setSelectedDateTo(newValue);
    };

    return (
        <div className="flex gap-3 select-none items-center flex-wrap">
            <SortDropDown sort={sort} setSort={setSort} />

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
            {/* <SearchTicket
                selectedDateFrom={selectedDateFrom}
                handleDateFrom={handleDateFrom}
                selectedDateTo={selectedDateTo}
                handleDateTo={handleDateTo}
            /> */}
            <div className="flex gap-3 flex-wrap">
                <BasicDatePicker
                    label={"Дата от"}
                    handler={handleDateFrom}
                    maxDate={selectedDateTo}
                />
                <BasicDatePicker
                    label={"Дата до"}
                    handler={handleDateTo}
                    minDate={selectedDateFrom}
                />
            </div>
        </div>
    );
};

export {
    MultipleSelectCategories,
    MultipleSelectThemes,
    SortDropDown,
    SortEvents,
};
