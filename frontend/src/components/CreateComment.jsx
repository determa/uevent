import React from "react";
import { commentAPI } from "../services/CommentService";

const CreateComment = ({ eventId, parentId }) => {
    const [create_comment, { error }] = commentAPI.useCreateMutation();

    const handler = async (e) => {
        e.preventDefault();
        const res = await create_comment({
            params: { eventId, parentId },
            body: new FormData(e.target),
        });

        console.log(e.res);
    };

    return (
        <form className="flex flex-col gap-3" method="POST" onSubmit={handler}>
            <div className="py-2 px-4 bg-white rounded-lg border border-gray-200">
                <textarea
                    id="comment"
                    rows="6"
                    name="content"
                    className="w-full text-sm  bg-white text-gray-900 focus:outline-none"
                    placeholder="Write a comment..."
                    required
                ></textarea>
            </div>

            <div className="flex justify-end items-center">
                {error ? (
                    <span className="flex-1 text-red-700 text-sm font-semibold text-center">
                        {error.data?.message}
                    </span>
                ) : null}
                <button className="flex w-fit rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500">
                    Post comment
                </button>
            </div>
        </form>
    );
};

export default CreateComment;
