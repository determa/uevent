import React from "react";
import { eventAPI } from "../services/EventService";

const PaymentButton = ({ id }) => {
    const { data, error } = eventAPI.useGetPaymentDataQuery(id);

    return (
        <>
            {data && (
                <form
                    method="POST"
                    action="https://www.liqpay.ua/api/3/checkout"
                    acceptCharset="utf-8"
                >
                    <input type="hidden" name="data" value={data.data} />
                    <input
                        type="hidden"
                        name="signature"
                        value={data.signature}
                    />
                    <button className="mt-3 relative flex w-fit justify-center rounded-md bg-indigo-600 py-3 px-4 text-sm font-semibold text-white hover:bg-indigo-500">
                        Оплатить
                    </button>
                </form>
            )}
            {error && (
                <span className="text-red-700 text-sm font-semibold">
                    {error ? error.data?.message : null}
                </span>
            )}
        </>
    );
};
export default PaymentButton;
