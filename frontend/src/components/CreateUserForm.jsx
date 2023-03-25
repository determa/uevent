const CreateUserForm = () => {
    function previewImage() {
        const preview = document.getElementById("preview");
        const file = document.querySelector("input[type=file]").files[0];
        const reader = new FileReader();

        reader.addEventListener(
            "load",
            function () {
                preview.innerHTML = `<img src="${reader.result}" class="h-full w-full object-cover">`;
                preview.classList.remove("hidden");
            },
            false
        );

        if (file) {
            reader.readAsDataURL(file);
        }
    }

    return (
        <form className="flex gap-3 flex-col" action="#">
            <div className="flex items-center justify-center">
                <label
                    htmlFor="avatar"
                    className="relative flex items-center justify-center w-20 h-20 rounded-full bg-gray-400 text-gray-700 cursor-pointer hover:bg-gray-500"
                >
                    <svg
                        className="h-full w-full"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <rect
                            x="0.62854"
                            y="0.359985"
                            width="15"
                            height="15"
                            rx="7.5"
                        />
                        <path
                            d="M8.12421 7.20374C9.21151 7.20374 10.093 6.32229 10.093 5.23499C10.093 4.14767 9.21151 3.26624 8.12421 3.26624C7.0369 3.26624 6.15546 4.14767 6.15546 5.23499C6.15546 6.32229 7.0369 7.20374 8.12421 7.20374Z"
                            fill="currentColor"
                        />
                        <path
                            d="M11.818 10.5975C10.2992 12.6412 7.42106 13.0631 5.37731 11.5537C5.01171 11.2818 4.69296 10.9631 4.42107 10.5975C4.28982 10.4006 4.27107 10.1475 4.37419 9.94123L4.51482 9.65059C4.84296 8.95684 5.53671 8.51624 6.30546 8.51624H9.95231C10.7023 8.51624 11.3867 8.94749 11.7242 9.62249L11.8742 9.93184C11.968 10.1475 11.9586 10.4006 11.818 10.5975Z"
                            fill="currentColor"
                        />
                    </svg>
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
                autoComplete="email"
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
