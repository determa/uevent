import React, { useEffect } from "react";

function LiqPay() {
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "//static.liqpay.ua/libjs/checkout.js";
        script.async = true;

        document.body.appendChild(script);

        window.LiqPayCheckoutCallback = function () {
            window.LiqPayCheckout.init({
                data: "eyJ2ZXJzaW9uIjozLCJhY3Rpb24iOiJwYXkiLCJhbW91bnQiOjUsImN1cnJlbmN5IjoiVUFIIiwiZGVzY3JpcHRpb24iOiLQnNGW0Lkg0YLQvtCy0LDRgCIsInB1YmxpY19rZXkiOiJzYW5kYm94X2kxNDU4NzgyOTM2OCIsImxhbmd1YWdlIjoidWsifQ==",
                signature: "gZVWj6mR+yvJnkkGpHIIA6TR4Ko=",
                embedTo: "#liqpay_checkout",
                mode: "popup", // embed || popup,
            })
                .on("liqpay.callback", function (data) {
                    console.log(data.status);
                    console.log(data);
                })
                .on("liqpay.ready", function (data) {
                    // ready
                })
                .on("liqpay.close", function (data) {
                    // close
                });
        };
    }, []);
    return <div id="liqpay_checkout"></div>;
}

export default LiqPay;
