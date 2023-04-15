import React from "react";
import { useParams } from "react-router";
import { GoogleMapComponent } from "../components/GoogleMapComponent";
import { eventAPI } from "../services/EventService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import CommentComponent from "../components/CommentComponent";
import { comments } from "../components/dataList";

const PaymentButton = ({ id }) => {
    const { data, error } = eventAPI.useGetPaymentDataQuery(id);

    return (
        <>
            {data && (
                <form
                    method="POST"
                    action="https://www.liqpay.ua/api/3/checkout"
                    acceptCharset="utf-8"
                >
                    <input type="hidden" name="data" value={data.data} />
                    <input
                        type="hidden"
                        name="signature"
                        value={data.signature}
                    />
                    <button className="mt-3 relative flex w-fit justify-center rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500">
                        Оплатить
                    </button>
                </form>
            )}
            {error && (
                <span className="text-red-700 text-sm font-semibold">
                    {error ? error.data?.message : null}
                </span>
            )}
        </>
    );
};

const EventPage = () => {
    const { isAuth, confirmed } = useSelector((state) => state.userReducer);
    const { id } = useParams();
    const { data } = eventAPI.useGetOneEventQuery(id);
    const commentHandler = (e) => {
        e.preventDefault();
        console.log(e.target);
    };
    return (
        <>
            {data && (
                <>
                    {console.log(data)}
                    <div className="flex shadow-sm gap-3 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                        <img
                            className="rounded-lg h-80 w-56 object-cover object-center"
                            alt="afisha"
                            src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                        />
                        <div className="flex flex-1 flex-col px-4 gap-5 min-w-[14rem]">
                            <p className="text-sm text-gray-500 font-semibold">
                                {dayjs(data.date).format(
                                    "dddd, DD MMMM YYYY HH:mm"
                                )}
                            </p>
                            <div className="flex-1">
                                <h1 className="py-4 text-4xl font-medium">
                                    {data.title}
                                </h1>
                            </div>
                            <div className="flex gap-3">
                                <p className="px-3 py-1 bg-black/20">
                                    {data.theme.name}
                                </p>
                                <p className="px-3 py-1 bg-black/20">
                                    {data.category.name}
                                </p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="font-bold text-3xl text-gray-700">
                                    {data.price}
                                    <span className="text-lg"> грн</span>
                                </p>

                                {isAuth && confirmed ? (
                                    <PaymentButton id={id} />
                                ) : (
                                    <Link
                                        to="/auth"
                                        className="mt-3 relative flex w-fit justify-center rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500"
                                    >
                                        Авторизоваться
                                    </Link>
                                )}
                            </div>
                        </div>
                        <div className="flex w-full lg:w-2/5 h-80 min-w-[20rem]">
                            <GoogleMapComponent
                                center={JSON.parse(data.location).location}
                            />
                        </div>
                    </div>
                    <div className="mt-4 flex shadow-sm gap-3 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                        <h1 className="font-medium text-xl">Описание</h1>
                        <p className="text-justify text-gray-800">
                            {data.description}
                        </p>
                    </div>
                    <div className="mt-4 flex flex-col shadow-sm gap-4 max-w-7xl mx-auto p-6 bg-slate-100 border border-gray-200 rounded-lg flex-wrap">
                        <form
                            className="flex flex-col gap-3"
                            method="POST"
                            onSubmit={commentHandler}
                        >
                            <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                                Discussion (20)
                            </h2>
                            <div className="py-2 px-4 bg-white rounded-lg border border-gray-200">
                                <textarea
                                    id="comment"
                                    rows="6"
                                    className="w-full text-sm  bg-white text-gray-900 focus:outline-none"
                                    placeholder="Write a comment..."
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end">
                                <button className="flex w-fit rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500">
                                    Post comment
                                </button>
                            </div>
                        </form>
                        {comments &&
                            comments.map((data) => (
                                <div
                                    className="flex flex-col gap-2"
                                    key={data.id}
                                >
                                    <CommentComponent data={data} />
                                    {data.replies &&
                                        data.replies.map((reply) => (
                                            <div
                                                key={reply.id}
                                                className="ml-12"
                                            >
                                                <CommentComponent
                                                    data={reply}
                                                />
                                            </div>
                                        ))}
                                </div>
                            ))}
                    </div>
                </>
            )}
        </>
    );
};

export default EventPage;
