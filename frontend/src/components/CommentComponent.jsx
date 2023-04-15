import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import CreateComment from "./CreateComment";

const CommentComponent = ({ data }) => {
    const [add, setAdd] = useState(false);
    const answerHandler = () => {
        console.log("answer");
        setAdd(true);
    };
    return (
        <>
            <div className="flex flex-col gap-3 p-4 bg-white rounded-lg border border-gray-200">
                <div className="flex gap-3">
                    <img
                        className="rounded-xl border border-gray-300 object-cover object-center backdrop-blur-sm w-12 h-12"
                        src={`${process.env.REACT_APP_SERVER_DOMEN}/${
                            data.account.type === "USER"
                                ? data.account.user.picture
                                : data.account.company.picture
                        }`}
                    />
                    <div className="flex flex-col justify-center">
                        <Link
                            to={`/profile/${data.account.type.toLowerCase()}/${
                                data.account.type === "USER"
                                    ? data.account.user.id
                                    : data.account.company.id
                            }`}
                            className="font-semibold text-base"
                        >
                            {data.account.type === "USER"
                                ? data.account.user.name
                                : data.account.company.name}
                        </Link>
                        <span className="text-xs text-gray-600">
                            {dayjs(data.createdAt).format("DD MMMM YYYY HH:mm")}
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
            {add && <CreateComment />}
        </>
    );
};

export default CommentComponent;
