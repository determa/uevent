import { useState } from "react";
import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";

const AuthPage = () => {
    let [page, setPage] = useState(false);

    return (
        <div className="flex flex-col items-center bg-white rounded-lg shadow-md p-5 gap-4">
            <h1 className="font-semibold">
                {page ? "Create Account" : "Welcome"}
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
                    Login
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
                    SignUp
                </button>
            </div>
            <div className="flex">{page ? <SignUpForm /> : <AuthForm />}</div>
        </div>
    );
};

export default AuthPage;
