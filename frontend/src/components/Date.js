import * as React from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileDateTimePicker } from "@mui/x-date-pickers";

export default function MaterialUIPickers({
    label,
    dateNow,
    value,
    handleChange,
}) {

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Stack spacing={3}>
                <MobileDateTimePicker 
                    inputFormat="DD/MM/YYYY HH:mm"
                    label={label}
                    value={value}
                    onChange={handleChange}
                    ampm={false}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Stack>
        </LocalizationProvider>
    );
}
