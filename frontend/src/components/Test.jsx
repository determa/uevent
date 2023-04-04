import React, { useEffect, useState } from "react";
import { createCategory, fetchCategories } from "../API/categoryAPI";
import categoriesStore from "../store/CategoriesStore";
import { observer } from "mobx-react-lite";

const Test = observer(() => {
    const [title, setTitle] = useState("");

    const addCat = async (e) => {
        e.preventDefault();
        const response = await createCategory(title);
        categoriesStore.addCategory(response);
    };

    useEffect(() => {
        fetchCategories().then((data) => {
            console.log(data.rows)
            categoriesStore.setCategories(data.rows)
        });
    }, []);

    return (
        <div>
            <form>
                <input
                    id="title"
                    name="text"
                    type="text"
                    required
                    className="w-full border-2 duration-300 border-gray-200 text-gray-900 py-1.5 px-2.5 placeholder:text-gray-400 outline-none outline-offset-0 hover:border-indigo-400 focus:border-indigo-600 rounded-md sm:text-sm sm:leading-6"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    className="bg-blue-300 p-3 rounded-lg mt-3"
                    onClick={addCat}
                >
                    add
                </button>
            </form>
            <div className="flex flex-col gap-3">
                {categoriesStore.categories.map((category) => (
                    <div
                        key={category.id}
                        className="text-white bg-slate-500 p-3"
                    >
                        {category.title}
                    </div>
                ))}
            </div>
        </div>
    );
});

export default Test;
