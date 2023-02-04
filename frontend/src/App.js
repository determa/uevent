import React from "react";
import Header from "./components/Header";
import "./App.css";
// import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <div className="App">
            <Header />
            <div className="container">
                {/* <Routes>
                    <Route path="/" element={<Header />} />
                </Routes> */}
            </div>
        </div>
    );
}

export default App;
