import React from "react";
import Header from "../components/Header";
import SearchTicket from "../components/SearchTicket";
import Events from "../components/Events";
import Footer from "../components/Footer";

const MainPage = () => {
    return (
        <div className="flex flex-col justify-between min-h-screen">
            <div className="bg-header bg-center h-96">
                <Header />
            </div>
            <SearchTicket />
            <div className="px-4 sm:px-6 lg:px-8 mb-7">
                <Events />
            </div>
            <Footer />
        </div>
    );
};

export default MainPage;
