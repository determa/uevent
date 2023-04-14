import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

export default function MaterialUIPickers({ label, value, minDate, maxDate, handleChange }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <MobileDateTimePicker
                    inputFormat="DD/MM/YYYY HH:mm"
                    label={label}
                    value={value}
                    size={"small"}
                    onChange={handleChange}
                    ampm={false}
                    minDate={minDate}
                    maxDateTime={maxDate}
                    // componentsProps={{ textField: { variant: 'outlined' } }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
