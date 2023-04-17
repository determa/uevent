import React from "react";
import { themeAPI } from "../services/ThemeService";
import { MenuItem, TextField } from "@mui/material";

const SelectTheme = ({ setOption, setTags }) => {
    const { data } = themeAPI.useGetAllQuery();
    const selectHandler = (e) => {
        e.preventDefault();
        setOption(e.target.value);
        setTags("");
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

export default SelectTheme;
