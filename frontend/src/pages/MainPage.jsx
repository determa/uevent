import React from "react";
import Header from "../components/Header";
import SearchTicket from "../components/SearchTicket";
import Events from "../components/Events";
import Footer from "../components/Footer";

const MainPage = () => {
    return (
        <>
            <Header />
            <div className="px-4 sm:px-6 lg:px-8">
                <SearchTicket />
                <Events />
            </div>
            <Footer />
        </>
    );
};

export default MainPage;
