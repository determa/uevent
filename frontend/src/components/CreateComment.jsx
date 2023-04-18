import React from "react";
import { commentAPI } from "../services/CommentService";

const CreateComment = ({ eventId, parentId, onClose }) => {
    const [create_comment, { error }] = commentAPI.useCreateCommentMutation();

    const handler = async (e) => {
        e.preventDefault();
        console.log(eventId, parentId);
        const res = await create_comment({
            params: { eventId, parentId },
            body: new FormData(e.target),
        });
        if (parentId !== null) onClose();
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

            <div className="flex justify-end gap-5 items-center">
                {error ? (
                    <span className="flex-1 text-red-700 text-sm font-semibold text-center">
                        {error.data?.message}
                    </span>
                ) : null}
                {onClose ? (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onClose();
                        }}
                        className="flex w-fit rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500"
                    >
                        Закрыть
                    </button>
                ) : null}
                <button className="flex w-fit rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500">
                    Отправить
                </button>
            </div>
        </form>
    );
};

export default CreateComment;
