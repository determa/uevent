import React from "react";
import { categoryAPI } from "../services/CategoryService";
import { MenuItem, TextField } from "@mui/material";

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

const SelectorInputCategory = ({ option, tags, setTags }) => {
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

export default SelectorInputCategory;
