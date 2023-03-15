const CreateCompanyForm = () => {
    return (
        <form className="flex gap-3 flex-col" action="#">
            <input
                id="email"
                name="email"
                type="text"
                autoComplete="email"
                required
                className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Email address"
            />
            <input
                id="password"
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                placeholder="Password"
            />

            <div>
                <button
                    type="submit"
                    className="relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                >
                    Login
                </button>
            </div>
        </form>
    );
};

export default CreateCompanyForm;
