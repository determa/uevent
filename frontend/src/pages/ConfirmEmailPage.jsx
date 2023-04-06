import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelopeCircleCheck } from "@fortawesome/free-solid-svg-icons";

const ConfirmEmailPage = () => {
    const sendEmail = () => {
        console.log("send to serv");
    };

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
                onClick={sendEmail}
            >
                Запросить код еще раз
            </p>
        </div>
    );
};

export default ConfirmEmailPage;
