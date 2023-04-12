import React from "react";
import { useParams } from "react-router";
import { GoogleMapComponent } from "../components/GoogleMapComponent";
import { eventAPI } from "../services/EventService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";

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
                    <button className="mt-3 relative flex w-fit justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500">
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
    const { isAuth } = useSelector((state) => state.userReducer);
    const { id } = useParams();
    const { data } = eventAPI.useGetOneEventQuery(id);

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
                        <div className="flex flex-1 flex-col p-4 gap-3 min-w-[14rem]">
                            <p className="text-sm text-gray-500 font-semibold">
                                {dayjs(data.date).format("dddd, DD MMMM YYYY HH:mm")}
                            </p>
                            <div className="flex-1">
                                <h1 className="py-4 text-4xl font-medium">
                                    {data.title}
                                </h1>
                            </div>
                            <div className="flex gap-3">
                                {/* {data.categories.map((category, index) => (
                            <p key={index} className="px-3 py-1 bg-black/20">
                                {category}
                            </p>
                        ))} */}
                            </div>
                            <p className="font-bold text-gray-700">
                                {data.price} грн
                            </p>

                            {isAuth ? (
                                <PaymentButton id={id} />
                            ) : (
                                <Link
                                    to="/auth"
                                    className="mt-3 relative flex w-fit justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500"
                                >
                                    Авторизоваться
                                </Link>
                            )}
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
                </>
            )}
        </>
    );
};

export default EventPage;
