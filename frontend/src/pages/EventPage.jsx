import React from "react";
import { useParams } from "react-router";
import { GoogleMapComponent } from "../components/GoogleMapComponent";
import { eventAPI } from "../services/EventService";

const EventPage = () => {
    const { id } = useParams();
    const { data } = eventAPI.useGetOneEventQuery(id);

    return (
        <>
            {data && (
                <>
                    {console.log(data)}
                    <div className="flex shadow-sm justify-center gap-3 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                        <img
                            className="rounded-lg h-80 w-56 object-cover object-center"
                            alt="afisha"
                            src={data.picture}
                        />
                        <div className="flex flex-col p-4 gap-3">
                            <p className="text-sm text-gray-500 font-semibold">
                                {data.date}
                            </p>
                            <div className="flex-1">
                                <h1 className="py-4 text-4xl font-medium">
                                    {data.title}
                                </h1>
                                <p className="text-sm">{data.location}</p>
                            </div>
                            <div className="flex gap-3">
                                {/* {data.categories.map((category, index) => (
                            <p key={index} className="px-3 py-1 bg-black/20">
                                {category}
                            </p>
                        ))} */}
                            </div>
                            <div>
                                <p className="font-bold text-gray-700">
                                    {data.price}
                                </p>
                                <button className="mt-3 relative flex w-28 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500">
                                    Buy
                                </button>
                            </div>
                            <div id="liqpay_checkout"></div>
                            <form
                                method="POST"
                                action="https://www.liqpay.ua/api/3/checkout"
                                acceptCharset="utf-8"
                            >
                                <input
                                    type="hidden"
                                    name="data"
                                    value={data.data}
                                />
                                <input
                                    type="hidden"
                                    name="signature"
                                    value={data.signature}
                                />
                                <input
                                    type="image"
                                    alt="img"
                                    src="//static.liqpay.ua/buttons/p1ru.radius.png"
                                />
                            </form>
                        </div>
                        <div className="flex flex-1 h-auto">
                            <GoogleMapComponent
                                center={{ lat: 48.45, lng: 35.04 }}
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
