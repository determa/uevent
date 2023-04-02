import React from "react";

const evnts = [
    {
        id: 1,
        name: "Dnipro Fest",
        href: "#",
        imageSrc:
            "https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg",
        imageAlt: "Party",
        date: "Fri, 24.03.2022 19:00",
        price: "350 грн",
        place: "Dnipro City",
    },
    {
        id: 2,
        name: "Dnipro Fest",
        href: "#",
        imageSrc:
            "https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg",
        imageAlt: "Party",
        date: "Fri, 24.03.2022 19:00",
        price: "350 грн",
        place: "Dnipro City",
    },
    {
        id: 3,
        name: "Dnipro Fest",
        href: "#",
        imageSrc:
            "https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg",
        imageAlt: "Party",
        date: "Fri, 24.03.2022 19:00",
        price: "350 грн",
        place: "Dnipro City",
    },
    {
        id: 4,
        name: "Dnipro Fest",
        href: "#",
        imageSrc:
            "https://img.freepik.com/free-vector/silhouette-party-audience_1048-9714.jpg",
        imageAlt: "Party",
        date: "Fri, 24.03.2022 19:00",
        price: "350 грн",
        place: "Dnipro City",
    },
];

const Events = () => {
    return (
        <div className="mx-auto max-w-2xl lg:max-w-7xl">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                Customers also purchased
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
                {evnts.map((evnts) => (
                    <div
                        key={evnts.id}
                        className="group relative rounded-lg bg-white drop-shadow-[0_19px_47px_rgba(119,115,170,0.1)]"
                    >
                        <div className="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-t-lg bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                            <img
                                src={evnts.imageSrc}
                                alt={evnts.imageAlt}
                                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                            />
                        </div>
                        <div className="flex p-6 flex-col gap-2">
                            <p className="text-xs">{evnts.date}</p>
                            <div className="flex justify-between items-center">
                                <h3 className="text-xl font-semibold text-gray-700">
                                    <a href={evnts.href}>{evnts.name}</a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    {evnts.color}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {evnts.price}
                                </p>
                            </div>
                            <p className="text-sm">{evnts.place}</p>
                            <p className="font-bold text-sm">{evnts.price}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Events;
