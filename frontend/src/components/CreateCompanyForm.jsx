import PlaceComponent from "./LocationInput";
import previewImage from "../utils/previewImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CreateCompanyForm = ({handler}) => {

    return (
        <form
            className="flex flex-col"
            method="POST"
            onSubmit={handler}
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
                className="mt-3 border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Enter your name"
            />

            <PlaceComponent />

            <textarea
                id="description"
                name="description"
                type="text"
                required
                className="my-3 w-full border-2 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="description"
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

export default CreateCompanyForm;
