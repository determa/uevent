import React from "react";
import { ticketAPI } from "../services/TicketService";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

// const tickets = [
//     {
//         id: 1,
//         seat: 3,
//         transaction_id: 2276923001,
//         accountId: 1,
//         eventId: 1,
//         createdAt: "2023-04-11 14:46:19.126+00",
//     },
//     {
//         id: 2,
//         seat: 4,
//         transaction_id: 2276923001,
//         accountId: 1,
//         eventId: 1,
//         createdAt: "2023-04-11 14:46:19.126+00",
//     },
// ];

const TicketsPage = () => {
    const { data: tickets } = ticketAPI.useGetAllTicketsQuery();
    console.log(tickets);
    return (
        <div className="flex flex-col gap-3 max-w-7xl mx-auto relative">
            <h1 className="font-medium text-xl">Ваши билеты:</h1>
            {tickets &&
                tickets.map((data) => (
                    <div
                        key={data.id}
                        className="flex flex-wrap gap-5 justify-between w-full p-4 border border-gray-200 rounded-lg shadow-sm"
                    >
                        <div className="w-48 h-48">
                            <img
                                className="rounded-lg h-full w-full object-cover object-center"
                                alt="afisha"
                                src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.event.picture}`}
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-between gap-3">
                            <Link
                                to={`/events/${data.event.id}`}
                                className="text-xl font-medium"
                            >
                                Событие: {data.event.title}
                            </Link>
                            {/* <p className="text-xl font-medium">
                                Место: {data.seat}
                            </p> */}
                            <p className="font-medium">
                                Локация:
                                <span className="font-normal font-mono ml-1 text-sm">
                                    {JSON.parse(data.event.location).name}
                                </span>
                            </p>
                            {/* <p className="text-gray-700 text-sm">{data.email}</p> */}
                            <p className="text-sm font-medium">
                                Начало:
                                <span className="ml-1 text-xs font-bold text-gray-800">
                                    {dayjs(data.createdAt).format(
                                        "DD MMMM YYYY HH:mm"
                                    )}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-3 justify-between">
                            <img
                                alt="qr"
                                src={data.qr_code}
                                className="w-40 h-40 bg-gray-300"
                            />
                            <p className="text-xs font-medium">
                                ORDER INFO:
                                <span className="ml-1 text-gray-500">
                                    {data.transaction_id}
                                </span>
                            </p>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default TicketsPage;
