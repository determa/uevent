import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from "@fortawesome/free-solid-svg-icons";
import { faBell as farBell } from "@fortawesome/free-regular-svg-icons";
import { notifyAPI } from "../services/NotifyService";

const NotifyCompany = ({ companyId }) => {
    const { data: state } = notifyAPI.useGetCompanyNotifyStateQuery({ companyId });
    const [subscribe] = notifyAPI.useCompanySubscribeMutation();
    const [unsubscribe] = notifyAPI.useCompanyUnsubscribeMutation();

    return (
        <>
            {state ? (
                <FontAwesomeIcon
                    icon={faBell}
                    onClick={async () => {
                        await unsubscribe({ companyId });
                    }}
                    className="text-black w-8 h-8 hover:animate-pulse hover:transition hover:ease-out z-10"
                />
            ) : (
                <FontAwesomeIcon
                    icon={farBell}
                    onClick={async () => {
                        await subscribe({ companyId });
                    }}
                    className="text-black w-8 h-8 hover:animate-pulse hover:transition hover:ease-out z-10"
                />
            )}
        </>
    );
};

export default NotifyCompany;
