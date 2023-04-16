import React from "react";
import { useParams } from "react-router";
import { GoogleMapComponent } from "../components/GoogleMapComponent";
import { eventAPI } from "../services/EventService";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { commentAPI } from "../services/CommentService";
import CreateComment from "../components/CreateComment";
import RecurseComments from "../components/RecurseComments";
import PaymentButton from "../components/PaymentButton";
import Event from "../components/Event";
import { companyAPI } from "../services/CompanyService";
import FavoriteComponent from "../components/FavoriteComponent";
import NotifyComponent from "../components/NotifyComponent";
import NotifyCompany from "../components/NotifyCompany";

const SimilarEvents = ({ id }) => {
    const { data } = eventAPI.useGetAllEventsQuery({
        themes: [],
        categories: [id],
        sort: "-date",
        page: 1,
    });

    return (
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 drop-shadow-[0_4px_4px_rgba(0,0,0,0.25)]">
            {data &&
                data.map((event, index) => <Event key={index} event={event} />)}
        </div>
    );
};

const AboutCompany = ({ id }) => {
    const { isAuth, TYPE } = useSelector((state) => state.userReducer);
    const { data } = companyAPI.useGetOneCompanyQuery(id);

    return (
        <>
            {data && (
                <div className="mt-4 relative flex flex-col shadow-sm gap-4 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                    <h1 className="font-medium text-xl">Об организаторе:</h1>
                    {isAuth && TYPE === "USER" && (
                        <>
                            <div className="absolute m-5 right-0 top-0">
                                <NotifyCompany companyId={data.id} />
                            </div>
                        </>
                    )}
                    <p className="text-justify text-lg font-medium text-gray-800">
                        <span className="text-sm">Название: </span>
                        <Link to={`/profile/company/${data.id}`}>
                            {data.name}
                        </Link>
                    </p>
                    <p className="text-justify text-gray-800">
                        <span className="text-sm ">Email: </span>
                        <a
                            className="font-medium"
                            href={`mailto:${data.account.email}`}
                        >
                            {data.account.email}
                        </a>
                    </p>
                    <div>
                        <p className="font-semibold">Описание:</p>
                        <p className="text-lg text-justify">
                            {data.description}
                        </p>
                    </div>
                </div>
            )}
        </>
    );
};

const EventPage = () => {
    const { isAuth, confirmed } = useSelector((state) => state.userReducer);
    const { id } = useParams();
    const { data } = eventAPI.useGetOneEventQuery(id);
    const { data: comments } = commentAPI.useGetCommentsByEventQuery({ id });

    return (
        <>
            {data && (
                <>
                    <div className="flex shadow-sm gap-3 max-w-7xl mx-auto p-4 bg-white border border-gray-200 rounded-lg flex-wrap">
                        <div className="flex relative">
                            {isAuth && (
                                <>
                                    <NotifyComponent eventId={data.id} />
                                    <FavoriteComponent eventId={data.id} />
                                </>
                            )}
                            <img
                                className="rounded-lg h-80 w-56 object-cover object-center"
                                alt="afisha"
                                src={`${process.env.REACT_APP_SERVER_DOMEN}/${data.picture}`}
                            />
                        </div>
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
                    <AboutCompany id={data.companyId} />
                    <div className="mt-8 flex flex-col gap-3 max-w-7xl mx-auto flex-wrap">
                        <h2 className="text-lg lg:text-2xl font-semibold text-gray-900">
                            Похожие события:
                        </h2>
                        <SimilarEvents id={data.categoryId} />
                    </div>
                    <div className="mt-12 flex flex-col shadow-sm gap-4 max-w-7xl mx-auto p-6 bg-slate-100 border border-gray-200 rounded-lg flex-wrap">
                        <h2 className="text-lg lg:text-2xl font-bold text-gray-900">
                            Комментариев (
                            {comments && comments.count ? comments.count : 0})
                        </h2>
                        <CreateComment eventId={data.id} parentId={null} />
                        {comments && (
                            <RecurseComments
                                eventId={data.id}
                                comments={comments.comments}
                            />
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default EventPage;
