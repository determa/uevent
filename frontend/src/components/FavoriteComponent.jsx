import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as farHeart } from "@fortawesome/free-regular-svg-icons";
import { favoriteAPI } from "../services/FavoriteService";

const FavoriteComponent = ({ eventId }) => {
    const { data: state } = favoriteAPI.useGetFavoriteStateQuery({ eventId });
    const [subscribe] = favoriteAPI.useFavoriteSubscribeMutation();
    const [unsubscribe] = favoriteAPI.useFavoriteUnsubscribeMutation();

    return (
        <>
            {state ? (
                <FontAwesomeIcon
                    icon={faHeart}
                    onClick={async () => {
                        await unsubscribe({ eventId });
                    }}
                    className="absolute m-5 right-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-10"
                />
            ) : (
                <FontAwesomeIcon
                    icon={farHeart}
                    onClick={async () => {
                        await subscribe({ eventId });
                    }}
                    className="absolute m-5 right-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-10"
                />
            )}
        </>
    );
};

export default FavoriteComponent;
