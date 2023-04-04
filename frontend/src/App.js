import React, { useEffect, useState } from "react";
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import Footer from "./components/Footer";
import Header from "./components/Header";

const App = () => {

    return (
        <BrowserRouter>
            <div className="flex flex-col min-h-screen">
                <Header />
                <div className="flex-1 flex flex-col">
                    <AppRouter />
                </div>
                <Footer />
            </div>
        </BrowserRouter>
    );
};

export default App;
