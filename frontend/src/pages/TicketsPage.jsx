import React from "react";

const tickets = [
    {
        id: 1,
        seat: 3,
        transaction_id: 2276923001,
        accountId: 1,
        eventId: 1,
        createdAt: "2023-04-11 14:46:19.126+00",
    },
    {
        id: 2,
        seat: 4,
        transaction_id: 2276923001,
        accountId: 1,
        eventId: 1,
        createdAt: "2023-04-11 14:46:19.126+00",
    },
];

const TicketsPage = () => {
    // const { data: tickets } = userAPI.useGetAllTicketsQuery(id);
    return (
        <div className="flex flex-col gap-3 max-w-7xl mx-auto relative">
            <h1 className="font-medium text-xl">Ваши билеты:</h1>
            {tickets &&
                tickets.map((data) => (
                    <div
                        key={data.id}
                        className="flex flex-col gap-3 w-full p-4 border border-gray-200 rounded-lg shadow-sm"
                    >
                        <p className="text-xl font-medium">
                            Место: {data.seat}
                        </p>
                        {/* <p className="text-gray-700 text-sm">{data.email}</p> */}

                        <span className="text-xs text-gray-500">
                            {data.createdAt}
                        </span>
                    </div>
                ))}
        </div>
    );
};

export default TicketsPage;
