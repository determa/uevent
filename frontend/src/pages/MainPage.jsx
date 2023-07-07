import React from "react";
import Header from "../components/Header";
import Events from "../components/Events";
import Footer from "../components/Footer";

const MainPage = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="relative w-full items-center bg-header bg-center h-96">
                <Header />
                <img
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-80 object-cover object-center h-3/4"
                    src={`${process.env.REACT_APP_SERVER_DOMEN}/people.png`}
                    alt="logo"
                />
            </div>
            <div className="px-4 sm:px-6 lg:px-8 mb-7">
                <Events />
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;
