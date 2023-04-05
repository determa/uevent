import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Container = ({ component }) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <div className="flex-1">{component}</div>
            <Footer />
        </div>
    );
};

export default Container;
