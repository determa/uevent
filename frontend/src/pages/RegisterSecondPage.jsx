import { useState } from "react";
import { useDispatch } from "react-redux";
import CreateCompanyForm from "../components/CreateCompanyForm";
import CreateUserForm from "../components/CreateUserForm";
import { userAPI } from "../services/UserService";
import { setCredentials } from "../store/reducers/UserSlice";

const RegisterSecondPage = () => {
    let [page, setPage] = useState(false);
    let [location, setLocation] = useState(undefined);
    const [register_user] = userAPI.useRegisterUserMutation();
    const [register_company] = userAPI.useRegisterCompanyMutation();
    const dispatch = useDispatch();

    async function register_user_handler(e) {
        e.preventDefault();
        const res = await register_user(new FormData(e.target));
        if (!res.error) dispatch(setCredentials(res));
    }

    async function register_company_handler(e) {
        e.preventDefault();
        let form = new FormData(e.target);
        form.set(
            "location",
            JSON.stringify({ name: form.get("location"), location })
        );
        let res = await register_company(form);
        if (!res.error) dispatch(setCredentials(res));
    }

    return (
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-5 gap-4">
            <h1 className="font-semibold">
                {page ? "Create Company" : "Create User"}
            </h1>
            <div className="flex w-full">
                <button
                    className={
                        (page
                            ? "border-2 border-gray-200 text-gray-900 rounded-l-lg"
                            : "bg-indigo-600 text-white rounded-l-lg") +
                        " flex-1 py-2 px-3 text-sm font-semibold"
                    }
                    onClick={() => {
                        setPage(false);
                    }}
                >
                    User
                </button>
                <button
                    className={
                        (page
                            ? "bg-indigo-600 text-white rounded-r-lg"
                            : "border-2 border-gray-200 text-gray-900 rounded-r-lg") +
                        " flex-1 py-2 px-3 text-sm font-semibold"
                    }
                    onClick={() => {
                        setPage(true);
                    }}
                >
                    Company
                </button>
            </div>
            <div className="flex">
                {page ? (
                    <CreateCompanyForm
                        handler={register_company_handler}
                        setLocation={setLocation}
                    />
                ) : (
                    <CreateUserForm handler={register_user_handler} />
                )}
            </div>
        </div>
    );
};

export default RegisterSecondPage;
