import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { userAPI } from "../services/UserService";
import { setCredentials } from "../store/reducers/UserSlice";
import { useDispatch } from "react-redux";

const ConfirmEmailPage = () => {
    const [send] = userAPI.useSendRequestMutation();
    const { data } = userAPI.useInitQuery('', { pollingInterval: 5000 });
    const dispatch = useDispatch();

    useEffect(() => {
        if (data?.jwt_token) {
            console.log("work")
            // window.close();
            dispatch(setCredentials({ data }));
        }
    }, [data, dispatch])

    useEffect(() => {
        send();
    }, [send])

    return (
        <div className="flex flex-col items-center max-w-[300px] bg-white rounded-lg shadow-md p-5 gap-4">
            <FontAwesomeIcon
                icon={faEnvelopeCircleCheck}
                size="2xl"
                style={{ color: "#283852" }}
            />
            <p className="text-center text-sm">
                Введите код подтверждения, который мы отправили на электронный
                адрес
            </p>
            <p
                className="font-semibold text-sm text-blue-600 cursor-pointer"
                onClick={() => { send() }}
            >
                Запросить код еще раз
            </p>
        </div>
    );
};

export default ConfirmEmailPage;
