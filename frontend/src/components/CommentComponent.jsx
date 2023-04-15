import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

const CommentComponent = ({ data }) => {
    const answerHandler = () => {
        console.log("answer");
    };
    return (
        <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-gray-200">
            <div className="flex gap-3">
                <img
                    className="rounded-xl border border-gray-300 object-cover object-center backdrop-blur-sm w-12 h-12"
                    src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.user.picture}`}
                />
                <div className="flex flex-col justify-center">
                    <Link
                        to={`/profile/user/${data.user.id}`}
                        className="font-semibold text-base"
                    >
                        {data.user.name}
                    </Link>
                    <span className="text-xs text-gray-600">
                        {dayjs(data.createAt).format("DD MMMM YYYY HH:mm")}
                    </span>
                </div>
            </div>
            <div>{data.content}</div>
            <span
                className="cursor-pointer text-gray-800 text-sm w-fit"
                onClick={answerHandler}
            >
                <FontAwesomeIcon icon={faReply} />
                <span> Ответить</span>
            </span>
        </div>
    );
};

export default CommentComponent;
