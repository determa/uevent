import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons";
import { notifyAPI } from "../services/NotifyService";

const NotifyComponent = ({ eventId }) => {
    const { data: state } = notifyAPI.useGetEventNotifyStateQuery({ eventId });
    const [subscribe] = notifyAPI.useEventSubscribeMutation();
    const [unsubscribe] = notifyAPI.useEventUnsubscribeMutation();

    return (
        <>
            {state ? (
                <FontAwesomeIcon
                    icon={faBell}
                    onClick={async () => {
                        await unsubscribe({ eventId });
                    }}
                    className="absolute m-5 left-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-10"
                />
            ) : (
                <FontAwesomeIcon
                    icon={farBell}
                    onClick={async () => {
                        await subscribe({ eventId });
                    }}
                    className="absolute m-5 left-0 top-0 text-white w-9 h-9 hover:animate-pulse hover:transition hover:ease-out z-10"
                />
            )}
        </>
    );
};

export default NotifyComponent;
