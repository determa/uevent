import React, { useState } from "react";
import dayjs from "dayjs";
import { FormControl } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function BasicDatePicker({ label, value, handler, minDate, maxDate }) {
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

const SearchTicket = ({
    selectedDateFrom,
    selectedDateTo,
    handleDateFrom,
    handleDateTo,
}) => {
    return (
        <FormControl >
            <div className="flex gap-3">
                <BasicDatePicker
                    label={"Дата от"}
                    value={selectedDateFrom}
                    handler={handleDateFrom}
                    maxDate={selectedDateTo}
                />
                <BasicDatePicker
                    label={"Дата до"}
                    value={selectedDateTo}
                    handler={handleDateTo}
                    minDate={selectedDateFrom}
                />
            </div>
        </FormControl>
    );
};

export default SearchTicket;
