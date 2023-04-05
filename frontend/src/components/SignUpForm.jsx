import { useDispatch } from "react-redux";
import { userAPI } from "../services/UserService";
import { setCredentials } from "../store/reducers/UserSlice";

const SignUpForm = () => {

    const [register, { data, error: reg_er }] = userAPI.useRegisterMutation();
    const dispatch = useDispatch();

    async function register_handler(e) {
        e.preventDefault();
        const res = await register(new FormData(e.target));
        dispatch(setCredentials(res));
    }

    return (
        <form className="flex gap-3 flex-col" method="POST" onSubmit={register_handler}>
            <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Email address"
            />
            <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Password"
            />

            <input
                id="password_conf"
                name="password_conf"
                type="password"
                autoComplete="new-password"
                required
                className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Confirm password"
            />

            <div>
                <button
                    type="submit"
                    className="relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                    Register
                </button>
            </div>
        </form>
    );
};

export default SignUpForm;
