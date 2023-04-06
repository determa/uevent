import { useDispatch } from "react-redux";
import { setCredentials } from "../store/reducers/UserSlice";
import { userAPI } from "../services/UserService";
import previewImage from "../utils/previewImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CreateUserForm = () => {
    // const [registerUser, { data: reg_data, error: reg_er }] =
    //     userAPI.useRegisterUserMutation();
    const dispatch = useDispatch();

    async function register_handler(e) {
        e.preventDefault();
        // let res = await registerUser(new FormData(e.target));
        // if (!res.error) dispatch(setCredentials(res));
    }

    return (
        <form
            className="flex gap-3 flex-col"
            method="POST"
            onSubmit={register_handler}
        >
            <div className="flex items-center justify-center">
                <label
                    htmlFor="avatar"
                    className="relative flex items-center justify-center w-16 h-16 rounded-full bg-gray-400 text-gray-800 cursor-pointer hover:bg-gray-500"
                >
                    <FontAwesomeIcon icon={faUser} size="2xl" />
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

            <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Enter your name"
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

export default CreateUserForm;
