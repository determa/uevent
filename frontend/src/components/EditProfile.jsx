import React, { useState } from "react";
import previewImage from "../utils/previewImage";
import {
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
} from "@mui/material";
import { indigo } from "@mui/material/colors";
import { userAPI } from "../services/UserService";
import { PlaceComponent } from "./GoogleMapComponent";
import { companyAPI } from "../services/CompanyService";

const CompanyProfileInputs = ({ data, location, setLocation }) => {
    return (
        <>
            <textarea
                id="description"
                name="description"
                type="text"
                className="border border-black border-opacity-25 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-950/60 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-[4px] sm:text-sm sm:leading-6"
                placeholder="Описание"
                defaultValue={data.description}
                required
            />
            <PlaceComponent location={location} setLocation={setLocation} />
        </>
    );
};

const EditCompanyProfile = ({ setShowModal, data }) => {
    const [update_company, { error }] = companyAPI.useUpdateCompanyMutation();
    let [location, setLocation] = useState(JSON.parse(data.location));

    async function handler(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        console.log(Object.fromEntries(form));
        form.set("location", JSON.stringify(location));
        const res = await update_company({ id: data.id, data: form });
        console.log(res);
        if (!res.error) {
            document.body.style.overflowY = "auto";
            setShowModal(false);
        }
    }
    return (
        <EditProfile
            data={data}
            handler={handler}
            error={error}
            type={"company"}
            location={location}
            setLocation={setLocation}
        />
    );
};

const EditUserProfile = ({ setShowModal, data }) => {
    const [update_user, { error }] = userAPI.useUpdateUserMutation();
    async function handler(e) {
        e.preventDefault();
        const form = new FormData(e.target);
        console.log(Object.fromEntries(form));
        const res = await update_user({ id: data.id, data: form });
        console.log(res);
        if (!res.error) {
            document.body.style.overflowY = "auto";
            setShowModal(false);
        }
    }
    return <EditProfile data={data} handler={handler} error={error} />;
};

const EditProfile = ({ data, handler, error, type, setLocation, location }) => {
    return (
        <form className="flex flex-col gap-5" method="POST" onSubmit={handler}>
            <div className="flex w-full items-center justify-center">
                <label
                    htmlFor="avatar"
                    className="relative flex justify-center rounded-full bg-gray-400 text-gray-800 cursor-pointer hover:bg-gray-500"
                >
                    <img
                        src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                        alt="img"
                        className="w-32 h-32 rounded-full object-cover object-center"
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
                        className="absolute inset-0 rounded-full overflow-hidden hidden"
                    ></div>
                </label>
            </div>
            {type !== "company" && (
                <FormControlLabel
                    control={
                        <Checkbox
                            defaultChecked={!data.visible}
                            sx={{
                                "&.Mui-checked": {
                                    color: indigo[600],
                                },
                            }}
                        />
                    }
                    label={
                        <Typography
                            className="select-none text-justify"
                            sx={{
                                fontWeight: 600,
                                fontSize: "13.5px",
                            }}
                        >
                            Скрытый аккаунт?
                        </Typography>
                    }
                    name="visible"
                />
            )}
            <TextField
                required
                label="Имя"
                size="small"
                name="name"
                type="text"
                defaultValue={data.name}
            />

            {type === "company" && (
                <CompanyProfileInputs
                    data={data}
                    location={location}
                    setLocation={setLocation}
                />
            )}

            {error && (
                <span className="text-red-700 text-sm font-semibold text-center">
                    {error.data?.message}
                </span>
            )}

            <button
                type="submit"
                className="relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
            >
                Сохранить
            </button>
        </form>
    );
};

export { EditUserProfile, EditCompanyProfile };
