import { useState } from "react";
import { useDispatch } from "react-redux";
import AuthForm from "../components/AuthForm";
import SignUpForm from "../components/SignUpForm";
import { userAPI } from "../services/UserService";
import { setCredentials } from "../store/reducers/UserSlice";

const AuthPage = () => {
    let [page, setPage] = useState(false);
    const [register, { data, error: reg_er }] = userAPI.useRegisterMutation();
    const [login, { data: log_data, error: log_er }] = userAPI.useLoginMutation();
    const dispatch = useDispatch();

    async function register_handler(e) {
        e.preventDefault();
        const res = await register(new FormData(e.target));
        if (!res.error) dispatch(setCredentials(res));
    }

    async function login_handler(e) {
        e.preventDefault();
        let res = await login(new FormData(e.target))
        if (!res.error) dispatch(setCredentials(res));
    }

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
            <div className="flex">{page ? <SignUpForm handler={register_handler}/> : <AuthForm handler={login_handler} />}</div>
        </div>
    );
};

export default AuthPage;
