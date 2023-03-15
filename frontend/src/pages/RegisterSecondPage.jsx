import { useState } from "react";
import CreateCompanyForm from "../components/CreateCompanyForm";
import CreateUserForm from "../components/CreateUserForm";

const RegisterSecondPage = () => {
    let [page, setPage] = useState(false);

    return (
        <div className="bg-auth-back min-h-screen flex justify-center items-center">
            <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-5 gap-4">
                <h1 className="font-semibold">
                    {page ? "Create User" : "Create Company"}
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
                    {page ? <CreateCompanyForm /> : <CreateUserForm />}
                </div>
            </div>
        </div>
    );
};

export default RegisterSecondPage;
